<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Intervention\Image\Facades\Image;
use Throwable;

class ImageAnalysisService
{
    private const CRITERIA = [
        'racism_percentage',
        'violence_or_hate_percentage',
        'sensitive_content_percentage',
        'blood_gore_percentage',
        'forged_percentage',
        'ai_generated_percentage',
    ];

    // Action thresholds (0-100)
    private const THRESHOLD_DELETE = 70;

    private const THRESHOLD_BLUR_STRONG = 60;
    private const THRESHOLD_BLUR_MEDIUM = 40;
    private const THRESHOLD_BLUR_LIGHT = 20;

    // Gemini retry settings
    private const GEMINI_MAX_ATTEMPTS = 5;
    private const GEMINI_BASE_DELAY_MS = 500; // 0.5s
    private const GEMINI_TIMEOUT_SECONDS = 60;

    // Cache TTL
    private const ANALYSIS_CACHE_TTL_SECONDS = 21600; // 6 hours

    private const ANALYSIS_LOCK_TTL_SECONDS = 30;

    public function analyze(string $imagePath, ?string $mimeType = null): array
    {
        $results = [
            'criteria_scores' => $this->emptyScores(),
            'description' => null,
            'recommended_action' => 'none',
            'actions' => [],
            'errors' => [],
        ];

        if (!is_file($imagePath) || !is_readable($imagePath)) {
            $results['errors']['image'] = 'تعذر قراءة ملف الصورة.';
            return $results;
        }

        $cacheKey = $this->makeCacheKey($imagePath, $mimeType);

        // Lock to avoid duplicate parallel Gemini calls for same image
        $lockKey = $cacheKey . ':lock';
        $lock = Cache::lock($lockKey, self::ANALYSIS_LOCK_TTL_SECONDS);

        try {
            if ($cached = Cache::get($cacheKey)) {
                return $cached;
            }

            if (!($lock->get())) {
                // Another worker is analyzing; wait briefly then try cache again.
                usleep(300000); // 0.3s
                $cached = Cache::get($cacheKey);
                if ($cached) {
                    return $cached;
                }
            }

            // الطبقة الأولى: Gemini
            $this->analyzeWithGemini($imagePath, $mimeType, $results);

            // الطبقة الثانية: Deepware (كشف التزييف العميق)
            $this->analyzeWithDeepware($imagePath, $results);

            // Normalize
            $results['criteria_scores'] = $this->normalizeScores($results['criteria_scores']);

            // Decide actions
            $this->resolveActions($results);

            Cache::put($cacheKey, $results, self::ANALYSIS_CACHE_TTL_SECONDS);
            return $results;
        } finally {
            try {
                optional($lock)->release();
            } catch (Throwable) {
                // ignore
            }
        }
    }

    private function makeCacheKey(string $imagePath, ?string $mimeType): string
    {
        $bytesHash = '';
        try {
            // Read file bytes to compute stable hash
            $bytes = @file_get_contents($imagePath);
            $bytesHash = $bytes !== false ? hash('sha256', $bytes) : (string) @filesize($imagePath);
        } catch (Throwable) {
            $bytesHash = (string) @filesize($imagePath);
        }

        $mime = $mimeType ?: 'image';
        $mtime = (string) (@filemtime($imagePath) ?: 0);

        return 'img_analyze:' . hash('sha256', $bytesHash . '|' . $mime . '|' . $mtime);
    }

    private function analyzeWithGemini(string $imagePath, ?string $mimeType, array &$results): void
    {
        $geminiKey = config('services.gemini.key');
        if (blank($geminiKey)) {
            $results['errors']['gemini'] = 'مفتاح Gemini غير مضبوط في ملف .env.';
            return;
        }

        $geminiModel = config('services.gemini.model', 'gemini-2.5-flash');
        $imageData = @file_get_contents($imagePath);
        if ($imageData === false) {
            $results['errors']['gemini'] = 'تعذر قراءة بيانات الصورة.';
            return;
        }

        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$geminiModel}:generateContent";

        $prompt = <<<'PROMPT'
أنت خبير في تقييم أمان المحتوى المرئي. مهمتك هي تحليل الصورة بدقة وإعطاء أرقام (من 0 إلى 100) لكل معيار:

1. racism_percentage: نسبة المحتوى العنصري
2. violence_or_hate_percentage: نسبة العنف أو الكراهية
3. sensitive_content_percentage: نسبة المحتوى الحساس
4. blood_gore_percentage: نسبة الدم أو المشاهد المروعة
5. forged_percentage: نسبة احتمال التزوير أو التعديل
6. ai_generated_percentage: نسبة احتمال أن الصورة مولدة بالذكاء الاصطناعي

قواعد التقييم:
- كن دقيقاً ولا تخفف من الخطورة. إذا كان هناك دم، أعطِ blood_gore_percentage قيمة عالية (أعلى من 60).
- إذا كان هناك سلاح أو عنف واضح، أعطِ violence_or_hate_percentage أعلى من 70.
- إذا كانت الصورة معدلة رقمياً، أعطِ forged_percentage أعلى من 50.
- إذا كانت الصورة تبدو مولدة بالذكاء الاصطناعي، أعطِ ai_generated_percentage أعلى من 50.

أعد النتيجة حصراً بصيغة JSON التالية، ولا تضف أي نص آخر:
{"criteria_scores": {"racism_percentage": 0, "violence_or_hate_percentage": 0, "sensitive_content_percentage": 0, "blood_gore_percentage": 0, "forged_percentage": 0, "ai_generated_percentage": 0}, "description": "وصف الصورة هنا"}
PROMPT;

        $attempt = 0;
        $delayMs = self::GEMINI_BASE_DELAY_MS;
        $lastError = null;

        while ($attempt < self::GEMINI_MAX_ATTEMPTS) {
            $attempt++;

            try {
                $http = new Client(['timeout' => self::GEMINI_TIMEOUT_SECONDS, 'verify' => false]);

                $response = $http->post($url, [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'x-goog-api-key' => $geminiKey,
                    ],
                    'json' => [
                        'contents' => [[
                            'parts' => [
                                ['text' => $prompt],
                                ['inline_data' => [
                                    'mime_type' => $mimeType ?: 'image/jpeg',
                                    'data' => base64_encode($imageData),
                                ]],
                            ],
                        ]],
                    ],
                ]);

                $body = json_decode($response->getBody(), true);
                $rawText = Arr::get($body, 'candidates.0.content.parts.0.text', '{}');

                // Robust JSON parsing: handle code fences + extra text
                $rawTextStr = (string) $rawText;
                $cleanJson = trim(str_replace(['```json', '```'], '', $rawTextStr));

                $parsed = json_decode($cleanJson, true);
                if (!is_array($parsed)) {
                    $start = strpos($cleanJson, '{');
                    $end = strrpos($cleanJson, '}');
                    if ($start !== false && $end !== false && $end > $start) {
                        $slice = substr($cleanJson, $start, $end - $start + 1);
                        $parsed = json_decode($slice, true);
                    }
                }


                if (is_array($parsed) && isset($parsed['criteria_scores'])) {
                    $results['criteria_scores'] = array_merge(
                        $this->emptyScores(),
                        $parsed['criteria_scores'] ?? []
                    );
                    $results['description'] = $parsed['description'] ?? null;
                }

                return;
            } catch (ClientException | ServerException $e) {
                $lastError = $e->getMessage();

                $status = (int) ($e->getResponse()?->getStatusCode() ?? 0);
                $retryable = in_array($status, [429, 503], true);

                if (!$retryable || $attempt >= self::GEMINI_MAX_ATTEMPTS) {
                    break;
                }

                $retryAfter = $e->getResponse()?->getHeaderLine('Retry-After');
                if (!blank($retryAfter) && is_numeric($retryAfter)) {
                    $delayMs = ((int) $retryAfter) * 1000;
                } else {
                    $jitter = random_int(0, 200);
                    $delayMs = min(8000, (int) ($delayMs * 2) + $jitter);
                }

                usleep($delayMs * 1000);
                continue;
            } catch (Throwable $e) {
                $lastError = $e->getMessage();
                break;
            }
        }

        $results['errors']['gemini'] = $lastError ?: 'Gemini request failed.';
    }

    private function analyzeWithDeepware(string $imagePath, array &$results): void
    {
        $deepwareKey = config('services.deepware.key');
        if (!$deepwareKey) {
            return;
        }

        $imageData = @file_get_contents($imagePath);
        if ($imageData === false) {
            $results['errors']['deepware'] = 'تعذر قراءة بيانات الصورة.';
            return;
        }

        try {
            $http = new Client(['timeout' => 30, 'verify' => false]);

            $response = $http->post('https://api.deepware.ai/v1/scan', [
                'headers' => [
                    'Authorization' => "Bearer {$deepwareKey}",
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'image' => base64_encode($imageData),
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            $deepfakeScore = (float) ($data['deepfake_probability'] ?? 0);

            // Deepware may return 0..1; normalize later in normalizeScores
            if ($deepfakeScore > 0) {
                $current = $results['criteria_scores']['ai_generated_percentage'] ?? 0;
                $results['criteria_scores']['ai_generated_percentage'] = max($current, $deepfakeScore);
            }
        } catch (Throwable $e) {
            $results['errors']['deepware'] = $e->getMessage();
        }
    }

    public function applyBlur(string $path, string $action): string
    {
        $img = Image::read($path);

        $blurLevel = match ($action) {
            'blur_strong' => 50,
            'blur_medium' => 30,
            'blur_light' => 15,
            default => 20,
        };

        $fileName = 'blurred_' . time() . '_' . uniqid() . '.jpg';
        $savePath = storage_path('app/public/' . $fileName);

        $img->blur($blurLevel)->save($savePath);
        return asset('storage/' . $fileName);
    }

    private function resolveActions(array &$results): void
    {
        $scores = $results['criteria_scores'];

        $blood = (int) ($scores['blood_gore_percentage'] ?? 0);
        $violence = (int) ($scores['violence_or_hate_percentage'] ?? 0);
        $forged = (int) ($scores['forged_percentage'] ?? 0);
        $aiGenerated = (int) ($scores['ai_generated_percentage'] ?? 0);

        // delete
        if ($blood >= self::THRESHOLD_DELETE
            || $violence >= self::THRESHOLD_DELETE
            || $forged >= self::THRESHOLD_DELETE
            || $aiGenerated >= self::THRESHOLD_DELETE
        ) {
            $results['actions'][] = 'delete';
            $results['recommended_action'] = 'delete';
            return;
        }

        // blur decisions based on worst relevant signal
        $maxBlur = max($blood, $violence);

        if ($maxBlur >= self::THRESHOLD_BLUR_STRONG) {
            $results['actions'][] = 'blur_strong';
            $results['recommended_action'] = 'blur_strong';
        } elseif ($maxBlur >= self::THRESHOLD_BLUR_MEDIUM) {
            $results['actions'][] = 'blur_medium';
            $results['recommended_action'] = 'blur_medium';
        } elseif ($maxBlur >= self::THRESHOLD_BLUR_LIGHT) {
            $results['actions'][] = 'blur_light';
            $results['recommended_action'] = 'blur_light';
        }
    }

    private function normalizeScores(array $scores): array
    {
        $normalized = [];
        foreach ($scores as $key => $value) {
            $v = is_numeric($value) ? (float) $value : 0;
            if ($v > 0 && $v <= 1.0) {
                $normalized[$key] = (int) round($v * 100);
            } else {
                $normalized[$key] = (int) round($v);
            }

            // clamp 0..100
            $normalized[$key] = max(0, min(100, (int) $normalized[$key]));
        }

        return array_merge($this->emptyScores(), $normalized);
    }

    private function emptyScores(): array
    {
        return array_fill_keys(self::CRITERIA, 0);
    }
}

