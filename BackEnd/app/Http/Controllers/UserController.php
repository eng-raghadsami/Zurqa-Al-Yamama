<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class UserController extends Controller
{
    #[OA\Get(
        path: '/api/users',
        summary: 'Get all users',
        tags: ['Users'],
        responses: [new OA\Response(response: 200, description: 'List of users')]
    )]
    public function index()
    {
        return response()->json(User::with(['stories','contents','reviews'])->get());
    }

    #[OA\Get(
        path: '/api/users/{id}',
        summary: 'Get a single user',
        tags: ['Users'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [new OA\Response(response: 200, description: 'User details')]
    )]
    public function show($id)
    {
        $user = User::with(['stories','contents','reviews'])->findOrFail($id);
        return response()->json($user);
    }

    #[OA\Post(
        path: '/api/users',
        summary: 'Create a new user',
        tags: ['Users'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(properties: [
                new OA\Property(property: 'name', type: 'string', example: 'Raghad'),
                new OA\Property(property: 'email', type: 'string', example: 'raghad@example.com'),
                new OA\Property(property: 'password', type: 'string', example: 'secret123')
            ])
        ),
        responses: [new OA\Response(response: 201, description: 'User created successfully')]
    )]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        return response()->json($user, 201);
    }

    #[OA\Put(
        path: '/api/users/{id}',
        summary: 'Update a user',
        tags: ['Users'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(properties: [
                new OA\Property(property: 'name', type: 'string', example: 'Updated User Name')
            ])
        ),
        responses: [new OA\Response(response: 200, description: 'User updated successfully')]
    )]
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json(['success' => true, 'user' => $user]);
    }

    #[OA\Delete(
        path: '/api/users/{id}',
        summary: 'Delete a user',
        tags: ['Users'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [new OA\Response(response: 200, description: 'User deleted successfully')]
    )]
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['success' => true]);
    }
}
