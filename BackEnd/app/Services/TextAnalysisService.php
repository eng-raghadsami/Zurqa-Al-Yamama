<?php

namespace App\Services;

use OpenAI;
use GuzzleHttp\Client;

class TextAnalysisService
{
    public function analyze(string $text): array
    {
        $results = [];

        // ✅ إذا النص فاضي، رجّعي رسالة واضحة
        if (empty(trim($text))) {
            return [
                'openai_summary' => 'لم يتم العثور على نص لتحليله.',
                'perspective' => [],
                'error' => null
            ];
        }

        // ✅ OpenAI: توليد ملخص وتقييم النص
        try {
            $client = OpenAI::client(config('services.openai.key'));
            $response = $client->chat()->create([
                'model' => 'gpt-4o-mini',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Summarize and evaluate the article based on ethics, credibility, and bias.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $text
                    ],
                ],
            ]);

            $results['openai_summary'] = $response->choices[0]->message->content ?? 'فشل في توليد الملخص.';
            $results['openai_error'] = null;
        } catch (\Exception $e) {
            $results['openai_summary'] = null;
            $results['openai_error'] = 'فشل في الاتصال بـ OpenAI: ' . $e->getMessage();
        }

        // ✅ Perspective API: تحليل الكراهية والسمية
        try {
            $http = new Client();
            $perspectiveResponse = $http->post(
                'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze',
                [
                    'query' => [
                        'key' => config('services.perspective.key')
                    ],
                    'json' => [
                        'comment' => ['text' => $text],
                        'requestedAttributes' => [
                            'TOXICITY' => new \stdClass(),
                            'INSULT' => new \stdClass(),
                            'SPAM' => new \stdClass(),
                        ],
                    ],
                ]
            );

            $results['perspective'] = json_decode($perspectiveResponse->getBody(), true);
            $results['perspective_error'] = null;
        } catch (\Exception $e) {
            $results['perspective'] = null;
            $results['perspective_error'] = 'فشل في الاتصال بـ Perspective API: ' . $e->getMessage();
        }

        return $results;
    }
}
