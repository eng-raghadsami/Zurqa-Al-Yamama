<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ImageAnalysisService;
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
                        new OA\Property(property: 'image', type: 'string', format: 'binary')
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Successful analysis'),
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

        // 应用模糊处理（仅当 action 不是 delete 时）
        foreach ($results['actions'] as $action) {
            if (in_array($action, ['blur_strong', 'blur_medium', 'blur_light'])) {
                $results['blurred_image_url'] = $service->applyBlur($path, $action);
            }
        }

        return response()->json([
            'analysis' => $results,
        ]);
    }
}
