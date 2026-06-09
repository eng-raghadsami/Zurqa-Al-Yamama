<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ImageAnalysisService;

class ImageAnalysisController extends Controller
{
    public function analyze(Request $request, ImageAnalysisService $service)
    {
<<<<<<< HEAD
        $request->validate(['image' => 'required|file|mimes:jpg,jpeg,png']);
=======
        $request->validate([
            'image' => 'required|file|mimes:jpg,jpeg,png,webp|max:10240'
        ]);
>>>>>>> 39ff47a240576f638641e39de3d2d7a30b9c73ed

        $file = $request->file('image');
        $results = $service->analyze($file->getRealPath(), $file->getMimeType());

        // تنفيذ التغبيش إذا لزم الأمر
        foreach ($results['actions'] as $action) {
            if ($action === 'blur_strong' || $action === 'blur_mild') {
                $results['blurred_image_url'] = $service->applyBlur($path, $action);
            }
        }

        return response()->json([
            'analysis' => $results,
        ]);
    }
}
