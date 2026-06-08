<?php

namespace App\Services;

use Smalot\PdfParser\Parser;

class ReportAnalysisService
{
    protected $textService;

    // حقن الاعتمادية لربط الخدمات ببعضها
    public function __construct(TextAnalysisService $textService)
    {
        $this->textService = $textService;
    }

    public function analyze(string $path): array
    {
        $extractedText = '';
        $results = [];

        try {
            // ✅ أولاً: فحص نوع الملف إذا كان PDF باستخدام PdfParser
            if (str_ends_with(strtolower($path), '.pdf')) {
                $parser = new Parser();
                $pdf = $parser->parseFile($path);
                $extractedText = $pdf->getText();
            } else {
                // ✅ ثانياً: إذا كان الملف صورة، نستخدم Google Vision OCR
                // استدعاء ديناميكي صامت لقهر الخطأ الوهمي للـ IDE
                $clientClass = '\Google\Cloud\Vision\V1\ImageAnnotatorClient';

                /** @var mixed $vision */
                $vision = new $clientClass([
                    'credentials' => config('services.google.vision_key')
                ]);

                $image = file_get_contents($path);
                $response = $vision->textDetection($image);
                $annotation = $response->getTextAnnotations();

                // تأمين المصفوفة لتجنب حدوث Crash إذا لم يعثر على نصوص في الصورة
                $extractedText = isset($annotation[0]) ? $annotation[0]->getDescription() : '';
            }

            $results['ocr_text'] = $extractedText;
            $results['ocr_error'] = null;
        } catch (\Exception $e) {
            $results['ocr_text'] = null;
            $results['ocr_error'] = 'فشل في استخراج النص من الملف: ' . $e->getMessage();
        }

        // ✅ ثالثاً: إرسال النص المستخلص إلى TextAnalysisService للمعالجة والتحليل بالـ AI
        if ($extractedText) {
            $results['text_analysis'] = $this->textService->analyze($extractedText);
        } else {
            $results['text_analysis'] = [
                'openai_summary' => null,
                'perspective' => null,
                'openai_error' => 'لا يوجد نص لتحليله',
                'perspective_error' => 'لا يوجد نص لتحليله'
            ];
        }

        return $results;
    }
}
