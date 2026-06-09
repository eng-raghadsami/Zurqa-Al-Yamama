<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ImageAnalysisService;

class ImageAnalysisController extends Controller
{
    public function analyze(Request $request, ImageAnalysisService $service)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpg,jpeg,png,webp|max:10240'
        ]);

        $file = $request->file('image');
        $path = $file->getRealPath();

        // 1. استدعاء الخدمة
        $results = $service->analyze($path, $file->getMimeType());

        // 2. تطبيق التغبيش بناءً على الـ Actions
        foreach ($results['actions'] as $action) {
            if (in_array($action, ['blur_strong', 'blur_medium', 'blur_light'])) {
                $results['blurred_image_url'] = $service->applyBlur($path, $action);
            }
        }

        // 3. إرجاع النتيجة النهائية
        return response()->json([
            'analysis' => $results,
        ]);
    }
}
