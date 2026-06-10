<?php

namespace App\Http\Controllers;

use App\Models\PublishedContent;
use App\Services\ElevenLabsTtsService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class TtsBroadcastController extends Controller
{
    #[OA\Post(
        path: '/api/published/{id}/broadcast/audio',
        summary: 'Generate audio broadcast for a published article using ElevenLabs',
        tags: ['Broadcasts'],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer')
            )
        ],
        requestBody: new OA\RequestBody(
            required: false,
            content: new OA\MediaType(
                mediaType: 'application/json',
                schema: new OA\Schema(
                    type: 'object',
                    properties: [
                        new OA\Property(property: 'voice_id', type: 'string', example: 'pNInz6obpgDQGcFmaJgB'),
                        new OA\Property(property: 'model_id', type: 'string', example: 'eleven_multilingual_v2'),
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Audio generated (or fetched from cache)'),
            new OA\Response(response: 422, description: 'Validation error'),
            new OA\Response(response: 500, description: 'ElevenLabs API error')
        ]
    )]
    public function audio(Request $request, int $id, ElevenLabsTtsService $service)
    {
        $published = PublishedContent::with(['content'])->findOrFail($id);

        $text = trim((string) ($published->content->body ?? ''));
        if ($text === '') {
            return response()->json([
                'error' => 'المقال المنشور لا يحتوي على نص للتحويل إلى صوت.'
            ], 422);
        }

        $voiceId = $request->input('voice_id') ?: (string) config('services.elevenlabs.voice_id');
        $modelId = $request->input('model_id') ?: (string) config('services.elevenlabs.model_id');

        if (blank($voiceId) || blank($modelId)) {
            return response()->json([
                'error' => 'voice_id أو model_id غير مضبوط.'
            ], 422);
        }

        // Caching: check if DB already has audio for this voice/model
        $audioPath = $published->audio_path ?? null;
        $cachedVoice = $published->audio_voice_id ?? null;
        $cachedModel = $published->audio_model_id ?? null;

        if ($audioPath
            && $cachedVoice === $voiceId
            && $cachedModel === $modelId
        ) {
            return response()->json([
                'audio_url' => $audioPath,
                'audio_mime_type' => 'audio/mpeg',
                'cached' => true,
            ]);
        }

        try {
            $result = $service->generateMp3($text, $published->id, $modelId, $voiceId);

            // Update DB with audio paths
            $published->audio_path = $result['audio_path'];
            $published->audio_model_id = $modelId;
            $published->audio_voice_id = $voiceId;
            $published->audio_generated_at = now();
            $published->save();

            return response()->json([
                'audio_url' => $result['audio_path'],
                'audio_mime_type' => $result['audio_mime_type'],
                'cached' => false,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'فشل توليد الصوت باستخدام ElevenLabs.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}


