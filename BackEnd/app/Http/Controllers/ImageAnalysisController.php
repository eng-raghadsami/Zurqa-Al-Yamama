<?php

namespace App\Http\Controllers;

use App\Services\ImageAnalysisService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ImageAnalysisController extends Controller
{
    #[OA\Post(
        path: '/api/images/analyze',
        summary: 'Analyze an image for safety',
        tags: ['Images'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: 'multipart/form-data',
                schema: new OA\Schema(
                    required: ['image'],
                    properties: [
                        new OA\Property(property: 'image', type: 'string', format: 'binary'),
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successful analysis',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(property: 'racism', type: 'integer'),
                        new OA\Property(property: 'violence', type: 'integer'),
                        new OA\Property(property: 'sensitive_content', type: 'integer'),
                        new OA\Property(property: 'blood', type: 'integer'),
                        new OA\Property(property: 'ai_generated', type: 'boolean'),
                        new OA\Property(property: 'forged', type: 'boolean'),
                        new OA\Property(property: 'ai_generated_percentage', type: 'integer'),
                        new OA\Property(property: 'forged_percentage', type: 'integer'),
                        new OA\Property(property: 'description', type: 'string'),
                        new OA\Property(
                            property: 'actions',
                            type: 'array',
                            items: new OA\Items(type: 'string')
                        ),
                        new OA\Property(property: 'criteria_scores', type: 'object'),
                        new OA\Property(property: 'errors', type: 'object'),
                        new OA\Property(property: 'blurred_image_url', type: 'string', nullable: true),
                    ]
                )
            ),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]
    public function analyze(Request $request, ImageAnalysisService $service)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpg,jpeg,png,webp|max:10240'
        ]);

        $file = $request->file('image');
        $path = $file->getRealPath();

        $results = $service->analyze($path, $file->getMimeType());
        $scores = $results['criteria_scores'];

        $blurredImageUrl = null;
        foreach ($results['actions'] as $action) {
            if (in_array($action, ['blur_strong', 'blur_medium', 'blur_light'], true)) {
                $blurredImageUrl = $service->applyBlur($path, $action);
            }
        }

        return response()->json([
            'racism' => $scores['racism_percentage'] ?? 0,
            'violence' => $scores['violence_or_hate_percentage'] ?? 0,
            'sensitive_content' => $scores['sensitive_content_percentage'] ?? 0,
            'blood' => $scores['blood_gore_percentage'] ?? 0,
            'ai_generated' => ($scores['ai_generated_percentage'] ?? 0) >= 70,
            'forged' => ($scores['forged_percentage'] ?? 0) >= 70,
            'ai_generated_percentage' => $scores['ai_generated_percentage'] ?? 0,
            'forged_percentage' => $scores['forged_percentage'] ?? 0,
            'description' => $results['description'] ?? '',
            'actions' => $results['actions'],
            'criteria_scores' => $scores,
            'errors' => $results['errors'] ?? [],
            ...( $blurredImageUrl ? ['blurred_image_url' => $blurredImageUrl] : []),
        ]);
    }
}

