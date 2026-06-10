<?php
namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ContentController extends Controller
{
    #[OA\Get(
        path: '/api/contents',
        summary: 'Get all contents',
        tags: ['Contents'],
        responses: [new OA\Response(response: 200, description: 'List of contents')]
    )]
    public function index()
    {
        return response()->json(Content::with(['user','category','reviews','published'])->get());
    }

    #[OA\Post(
        path: '/api/contents',
        summary: 'Create a new content',
        tags: ['Contents'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'title', type: 'string', example: 'New Content'),
                    new OA\Property(property: 'body', type: 'string', example: 'Content details'),
                    new OA\Property(property: 'user_id', type: 'integer', example: 1),
                    new OA\Property(property: 'category_id', type: 'integer', example: 2),
                    new OA\Property(property: 'status', type: 'string', example: 'draft'),
                    new OA\Property(property: 'updated_by', type: 'integer', example: 1)
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Content created successfully'),
            new OA\Response(response: 422, description: 'Validation or create error')
        ]
    )]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'status' => ['required', 'string', 'max:50'],
            'updated_by' => ['nullable', 'integer', 'exists:users,id'],
        ]);

        try {
            $content = Content::create($validated);
            return response()->json(['success' => true, 'content' => $content], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create content.',
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    #[OA\Get(
        path: '/api/contents/{id}',
        summary: 'Get a single content',
        tags: ['Contents'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [new OA\Response(response: 200, description: 'Content details')]
    )]
    public function show($id)
    {
        $content = Content::with(['user','category','reviews','published'])->findOrFail($id);
        return response()->json($content);
    }

    #[OA\Put(
        path: '/api/contents/{id}',
        summary: 'Update a content',
        tags: ['Contents'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'title', type: 'string', example: 'Updated Content Title'),
                    new OA\Property(property: 'body', type: 'string', example: 'Updated content details'),
                    new OA\Property(property: 'category_id', type: 'integer', example: 3),
                    new OA\Property(property: 'status', type: 'string', example: 'approved')
                ]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Content updated successfully')]
    )]
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'body' => ['sometimes', 'string'],
            'category_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'status' => ['sometimes', 'string', 'max:50'],
        ]);

        $content = Content::findOrFail($id);
        $content->update($validated);
        return response()->json(['success' => true, 'content' => $content]);
    }

    #[OA\Delete(
        path: '/api/contents/{id}',
        summary: 'Delete a content',
        tags: ['Contents'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [new OA\Response(response: 200, description: 'Content deleted successfully')]
    )]
    public function destroy($id)
    {
        Content::destroy($id);
        return response()->json(['success' => true]);
    }
}

