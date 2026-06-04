<?php
namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class StoryController extends Controller
{
    #[OA\Get(path: '/api/stories', summary: 'Get all stories', tags: ['Stories'], responses: [new OA\Response(response: 200, description: 'List of stories')])]
    public function index()
    {
        return response()->json(Story::with(['user','category'])->get());
    }

    #[OA\Post(
        path: '/api/stories',
        summary: 'Create a new story',
        tags: ['Stories'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(properties: [
                new OA\Property(property: 'title', type: 'string', example: 'New Story'),
                new OA\Property(property: 'content', type: 'string', example: 'Story details'),
                new OA\Property(property: 'category_id', type: 'integer', example: 1),
                new OA\Property(property: 'user_id', type: 'integer', example: 2)
            ])
        ),
        responses: [new OA\Response(response: 201, description: 'Story created successfully')]
    )]
    public function store(Request $request)
    {
        $story = Story::create($request->all());
        return response()->json(['success' => true, 'story' => $story]);
    }

    #[OA\Get(path: '/api/stories/{id}', summary: 'Get a single story', tags: ['Stories'], parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Story details')])]
    public function show($id)
    {
        $story = Story::with(['user','category'])->findOrFail($id);
        return response()->json($story);
    }

    #[OA\Put(path: '/api/stories/{id}', summary: 'Update a story', tags: ['Stories'], parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], requestBody: new OA\RequestBody(required: true, content: new OA\JsonContent(properties: [new OA\Property(property: 'title', type: 'string', example: 'Updated Story Title')])), responses: [new OA\Response(response: 200, description: 'Story updated successfully')])]
    public function update(Request $request, $id)
    {
        $story = Story::findOrFail($id);
        $story->update($request->all());
        return response()->json(['success' => true, 'story' => $story]);
    }

    #[OA\Delete(path: '/api/stories/{id}', summary: 'Delete a story', tags: ['Stories'], parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Story deleted successfully')])]
    public function destroy($id)
    {
        Story::destroy($id);
        return response()->json(['success' => true]);
    }
}
