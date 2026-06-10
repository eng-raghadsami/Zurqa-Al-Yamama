<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ConnectException;
use Throwable;

class TextAnalysisService
{
    public function analyze(string $text): array
    {
        $results = [
            'gemini_summary' => null,
            'perspective' => null,
            'errors' => [],
        ];

        if (empty(trim($text))) {
            return [
                'gemini_summary' => 'لم يتم إدخال نص للتحليل.',
                'perspective' => null,
                'errors' => [],
            ];
        }

        $this->analyzeWithGemini($text, $results);
        $this->analyzeWithHuggingFace($text, $results);

        return $results;
    }

   private function analyzeWithGemini(string $text, array &$results): void
{
    $geminiKey = config('services.gemini.key');
    $geminiModel = config('services.gemini.model', 'gemini-1.5-flash');

    if (blank($geminiKey)) {
        $results['errors']['gemini'] = 'مفتاح Gemini غير مضبوط في ملف .env.';
        return;
    }

    try {
        $http = new Client([
            'timeout' => 30,
            'verify' => false,
        ]);

        $prompt = "
أنت محرر عربي خبير في تحليل النصوص.

أعد JSON صالح فقط.
لا تستخدم Markdown.
لا تستخدم ```json.
لا تضف أي شرح أو نص خارج JSON.

يجب أن تكون جميع القيم النصية باللغة العربية.

الشكل المطلوب:

{
  \"criteria_scores\": {
    \"hate_speech_percentage\": 0,
    \"racism_percentage\": 0,
    \"gender_inclusivity_percentage\": 100,
    \"bias_percentage\": 0,
    \"immoral_language_percentage\": 0,
    \"violence_incitement_percentage\": 0
  },
  \"improvements\": [
    {
      \"original_phrase\": \"النص الأصلي\",
      \"suggested_fix\": \"الصياغة المقترحة\",
      \"reason\": \"سبب الاقتراح\"
    }
  ],
  \"general_advice\": \"نصيحة عامة\"
}

النص للتحليل:

{$text}
";

        $response = $http->post(
            "https://generativelanguage.googleapis.com/v1beta/models/{$geminiModel}:generateContent",
            [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'x-goog-api-key' => $geminiKey,
                ],
                'json' => [
                    'contents' => [
                        [
                            'parts' => [
                                [
                                    'text' => $prompt
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        );

        $body = json_decode($response->getBody()->getContents(), true);

        $rawText = $body['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (!$rawText) {
            $results['errors']['gemini'] = 'لم يتم استلام رد من Gemini.';
            return;
        }

        // إزالة Markdown إن وجد
        $rawText = preg_replace('/^```json\s*/i', '', $rawText);
        $rawText = preg_replace('/^```\s*/i', '', $rawText);
        $rawText = preg_replace('/\s*```$/i', '', $rawText);
        $rawText = trim($rawText);

        $decoded = json_decode($rawText, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $results['errors']['gemini'] =
                'أرجع Gemini صيغة JSON غير صالحة: ' .
                json_last_error_msg();

            $results['errors']['gemini_raw_response'] = $rawText;

            return;
        }

        $results['gemini_summary'] = $decoded;

    } catch (Throwable $e) {
        $results['errors']['gemini'] = 'خطأ في Gemini: ' . $e->getMessage();
    }
}

    private function analyzeWithHuggingFace(string $text, array &$results): void
    {
        $huggingFaceKey = config('services.huggingface.key');
        $huggingFaceModel = config('services.huggingface.moderation_model', 'akhooli/xlm-r-large-arabic-toxic');
        $huggingFaceApiUrl = rtrim(config('services.huggingface.api_url', 'https://router.huggingface.co/hf-inference/models'), '/');

        if (blank($huggingFaceKey)) {
            $results['errors']['perspective'] = 'مفتاح Hugging Face غير مضبوط في ملف .env. أضيفي HUGGINGFACE_API_KEY لاستخدام بديل Perspective الخارجي.';
            return;
        }

        try {
            $http = new Client(['timeout' => 30, 'verify' => false]);

            $response = $http->post(
                "{$huggingFaceApiUrl}/{$huggingFaceModel}",
                [
                    'headers' => [
                        'Authorization' => "Bearer {$huggingFaceKey}",
                        'Content-Type' => 'application/json',
                    ],
                    'json' => [
                        'inputs' => $text,
                        'options' => [
                            'wait_for_model' => true,
                        ],
                    ],
                ]
            );

            $predictions = json_decode($response->getBody(), true);
            $scores = $this->formatHuggingFaceScores($predictions);

            $results['perspective'] = [
                'source' => 'huggingface_moderation',
                'model' => $huggingFaceModel,
                'api_url' => $huggingFaceApiUrl,
                'note_ar' => 'هذا بديل API خارجي عن Perspective API باستخدام Hugging Face. النتائج احتمالية وتحتاج مراجعة تحريرية.',
                'attributeScores' => $scores,
                'raw' => $predictions,
            ];
        } catch (ConnectException $e) {
            $results['errors']['perspective'] = 'تعذر الاتصال بـ Hugging Face API. المشكلة غالبا من الإنترنت أو DNS أو Proxy/Firewall على الجهاز أو السيرفر، وليست من النص أو المفتاح.';
        } catch (Throwable $e) {
            $results['errors']['perspective'] = 'خطأ في Hugging Face moderation API: ' . $e->getMessage();
        }
    }

    private function formatHuggingFaceScores(array $predictions): array
    {
        $rows = isset($predictions[0][0]) ? $predictions[0] : $predictions;
        $scores = [];

        foreach ($rows as $row) {
            if (! isset($row['label'], $row['score'])) {
                continue;
            }

            $key = strtolower((string) $row['label']);
            $value = (float) $row['score'];

            $scores[$key] = [
                'label_ar' => $this->arabicModerationLabel($key),
                'summary_score' => [
                    'value' => $value,
                    'percentage' => (int) round($value * 100),
                ],
            ];
        }

        return $scores;
    }

    private function arabicModerationLabel(string $label): string
    {
        return match ($label) {
            'toxic', 'toxicity', 'hate', 'hate_speech', 'label_1' => 'محتوى سام أو مسيء',
            'non-toxic', 'non_toxic', 'normal', 'not_hate', 'label_0' => 'محتوى غير سام',
            default => $label,
        };
    }
}
