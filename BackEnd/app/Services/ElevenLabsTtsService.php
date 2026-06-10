<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Throwable;

class ElevenLabsTtsService
{
    public function generateMp3(string $text, int $publishedId, string $modelId, string $voiceId, array $options = []): array
    {
        $apiKey = config('services.elevenlabs.key');
        if (blank($apiKey)) {
            throw new \RuntimeException('ElevenLabs API key is missing. Set ELEVENLABS_API_KEY in .env');
        }

        $modelId = trim($modelId);
        $voiceId = trim($voiceId);

        $client = new Client([
            'timeout' => 120,
            'verify' => false,
        ]);

        // ElevenLabs TTS endpoint (streaming audio)
        // https://docs.elevenlabs.io/api-reference/text-to-speech
        $url = "https://api.elevenlabs.io/v1/text-to-speech/{$voiceId}";

        $payload = [
            'text' => $text,
            'model_id' => $modelId,
        ];

        // Optional settings (stability/similarity) if you want to tune later
        if (isset($options['voice_settings']) && is_array($options['voice_settings'])) {
            $payload['voice_settings'] = $options['voice_settings'];
        }

        $resp = $client->post($url, [
            'headers' => [
                'xi-api-key' => $apiKey,
                'accept' => 'audio/mpeg',
                'content-type' => 'application/json',
            ],
            'json' => $payload,
        ]);

        $audioBytes = $resp->getBody()->getContents();
        if (empty($audioBytes)) {
            throw new \RuntimeException('ElevenLabs returned empty audio stream.');
        }

        $fileName = 'tts_' . $publishedId . '_' . now()->timestamp . '_' . Str::random(8) . '.mp3';
        $dir = storage_path('app/public/audio/broadcasts/' . $publishedId);
        if (!is_dir($dir) && !mkdir($dir, 0775, true) && !is_dir($dir)) {
            throw new \RuntimeException('Failed to create audio storage directory.');
        }

        $audioPath = $dir . DIRECTORY_SEPARATOR . $fileName;
        if (@file_put_contents($audioPath, $audioBytes) === false) {
            throw new \RuntimeException('Failed to write audio file to storage.');
        }

        // Public URL (Laravel storage symlink)
        $publicUrl = asset('storage/audio/broadcasts/' . $publishedId . '/' . $fileName);

        return [
            'audio_path' => $publicUrl,
            'audio_mime_type' => 'audio/mpeg',
        ];

    }
}

