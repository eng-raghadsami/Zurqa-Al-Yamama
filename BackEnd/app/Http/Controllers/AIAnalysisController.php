<?php

namespace App\Http\Controllers;

use App\Models\AIAnalysis;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(name: "Analyses")]
class AIAnalysisController extends Controller
{
    #[OA\Get(
        path: "/api/analyses",
        summary: "Get all analyses",
        tags: ["Analyses"],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of analyses"
            )
        ]
    )]
    public function index()
    {
        return response()->json(AIAnalysis::with('content')->get());
    }

    #[OA\Post(
        path: "/api/analyses",
        summary: "Create analysis",
        tags: ["Analyses"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "content_id", type: "integer"),
                    new OA\Property(property: "result", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Created")
        ]
    )]
    public function store(Request $request)
    {
        $analysis = AIAnalysis::create($request->all());
        return response()->json($analysis);
    }

    #[OA\Get(
        path: "/api/analyses/{id}",
        summary: "Get analysis",
        tags: ["Analyses"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "OK")
        ]
    )]
    public function show($id)
    {
        return AIAnalysis::findOrFail($id);
    }

    #[OA\Put(
        path: "/api/analyses/{id}",
        summary: "Update analysis",
        tags: ["Analyses"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Updated")
        ]
    )]
    public function update(Request $request, $id)
    {
        $analysis = AIAnalysis::findOrFail($id);
        $analysis->update($request->all());

        return response()->json($analysis);
    }

    #[OA\Delete(
        path: "/api/analyses/{id}",
        summary: "Delete analysis",
        tags: ["Analyses"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Deleted")
        ]
    )]
    public function destroy($id)
    {
        AIAnalysis::destroy($id);
        return response()->json(['success' => true]);
    }
}
