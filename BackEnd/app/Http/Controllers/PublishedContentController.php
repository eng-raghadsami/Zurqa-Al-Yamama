<?php
namespace App\Http\Controllers;

use App\Models\PublishedContent;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class PublishedContentController extends Controller
{
    #[OA\Get(
        path: '/api/published',
        summary: 'Get all published contents',
        tags: ['Published'],
        responses: [new OA\Response(response: 200, description: 'List of published contents')]
    )]
    public function index()
    {
        return response()->json(PublishedContent::with(['content','journalist','editor','updater'])->get());
    }

    #[OA\Post(
        path: '/api/published',
        summary: 'Create a new published content',
        tags: ['Published'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(properties: [
                new OA\Property(property: 'content_id', type: 'integer', example: 1),
                new OA\Property(property: 'journalist_id', type: 'integer', example: 2),
                new OA\Property(property: 'editor_id', type: 'integer', example: 3)
            ])
        ),
        responses: [new OA\Response(response: 201, description: 'Published content created successfully')]
    )]
    public function store(Request $request)
    {
        $published = PublishedContent::create($request->all());
        return response()->json(['success' => true, 'published' => $published]);
    }

    #[OA\Get(
        path: '/api/published/{id}',
        summary: 'Get a single published content',
        tags: ['Published'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [new OA\Response(response: 200, description: 'Published content details')]
    )]
    public function show($id)
    {
        $published = PublishedContent::with(['content','journalist','editor','updater'])->findOrFail($id);
        return response()->json($published);
    }

    #[OA\Put(
        path: '/api/published/{id}',
        summary: 'Update a published content',
        tags: ['Published'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(properties: [
                new OA\Property(property: 'editor_id', type: 'integer', example: 3),
                new OA\Property(property: 'updater_id', type: 'integer', example: 4)
            ])
        ),
        responses: [new OA\Response(response: 200, description: 'Published content updated successfully')]
    )]
    public function update(Request $request, $id)
    {
        $published = PublishedContent::findOrFail($id);
        $published->update($request->all());
        return response()->json(['success' => true, 'published' => $published]);
    }

    #[OA\Delete(
        path: '/api/published/{id}',
        summary: 'Delete a published content',
        tags: ['Published'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [new OA\Response(response: 200, description: 'Published content deleted successfully')]
    )]
    public function destroy($id)
    {
        PublishedContent::destroy($id);
        return response()->json(['success' => true]);
    }
}
