<?php
namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ReviewController extends Controller
{
    #[OA\Get(path: '/api/reviews', summary: 'Get all reviews', tags: ['Reviews'], responses: [new OA\Response(response: 200, description: 'List of reviews')])]
    public function index()
    {
        return response()->json(Review::with(['content','editor'])->get());
    }

    #[OA\Post(
        path: '/api/reviews',
        summary: 'Create a new review',
        tags: ['Reviews'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(properties: [
                new OA\Property(property: 'content_id', type: 'integer', example: 1),
                new OA\Property(property: 'editor_id', type: 'integer', example: 2),
                new OA\Property(property: 'notes', type: 'string', example: 'Review notes')
            ])
        ),
        responses: [new OA\Response(response: 201, description: 'Review created successfully')]
    )]
    public function store(Request $request)
    {
        $review = Review::create($request->all());
        return response()->json(['success' => true, 'review' => $review]);
    }

    #[OA\Get(path: '/api/reviews/{id}', summary: 'Get a single review', tags: ['Reviews'], parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Review details')])]
    public function show($id)
    {
        $review = Review::with(['content','editor'])->findOrFail($id);
        return response()->json($review);
    }

    #[OA\Put(path: '/api/reviews/{id}', summary: 'Update a review', tags: ['Reviews'], parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Review updated successfully')])]
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $review->update($request->all());
        return response()->json(['success' => true, 'review' => $review]);
    }

    #[OA\Delete(path: '/api/reviews/{id}', summary: 'Delete a review', tags: ['Reviews'], parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Review deleted successfully')])]
    public function destroy($id)
    {
        Review::destroy($id);
        return response()->json(['success' => true]);
    }
}
