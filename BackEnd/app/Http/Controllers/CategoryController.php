<?php
namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class CategoryController extends Controller
{
    #[OA\Get(
        path: '/api/categories',
        summary: 'Get all categories',
        tags: ['Categories'],
        responses: [new OA\Response(response: 200, description: 'List of categories')]
    )]
    public function index()
    {
        return response()->json(Category::with(['children','stories','contents'])->get());
    }

    #[OA\Post(
        path: '/api/categories',
        summary: 'Create a new category',
        tags: ['Categories'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'Politics'),
                    new OA\Property(property: 'description', type: 'string', example: 'Political related content'),
                    new OA\Property(property: 'parent_id', type: 'integer', example: 1)
                ]
            )
        ),
        responses: [new OA\Response(response: 201, description: 'Category created successfully')]
    )]
    public function store(Request $request)
    {
        $category = Category::create($request->all());
        return response()->json(['success' => true, 'category' => $category]);
    }

    #[OA\Get(
        path: '/api/categories/{id}',
        summary: 'Get a single category',
        tags: ['Categories'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [new OA\Response(response: 200, description: 'Category details')]
    )]
    public function show($id)
    {
        $category = Category::with(['children','stories','contents'])->findOrFail($id);
        return response()->json($category);
    }

    #[OA\Put(
        path: '/api/categories/{id}',
        summary: 'Update a category',
        tags: ['Categories'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'Updated Politics'),
                    new OA\Property(property: 'description', type: 'string', example: 'All political news and reports'),
                    new OA\Property(property: 'parent_id', type: 'integer', example: 1)
                ]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Category updated successfully')]
    )]
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json(['success' => true, 'category' => $category]);
    }

    #[OA\Delete(
        path: '/api/categories/{id}',
        summary: 'Delete a category',
        tags: ['Categories'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [new OA\Response(response: 200, description: 'Category deleted successfully')]
    )]
    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['success' => true]);
    }
}
