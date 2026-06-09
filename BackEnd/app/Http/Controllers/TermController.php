<?php

namespace App\Http\Controllers;

use App\Models\Term;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use OpenApi\Attributes as OA;

class TermController extends Controller
{
    #[OA\Get(
        path: '/api/terms',
        summary: 'Get all media terms',
        tags: ['Terms'],
        responses: [new OA\Response(response: 200, description: 'List of terms')]
    )]
    public function index(Request $request)
    {
        $query = Term::query()->orderBy('word');

        if ($request->boolean('active_only')) {
            $query->active();
        }

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('word', 'like', "%{$search}%")
                    ->orWhere('meaning', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        return response()->json($query->get());
    }

    #[OA\Post(
        path: '/api/terms',
        summary: 'Create a media term',
        tags: ['Terms'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                required: ['word', 'meaning'],
                properties: [
                    new OA\Property(property: 'word', type: 'string', example: 'مصدر مطلع'),
                    new OA\Property(property: 'meaning', type: 'string', example: 'تعبير يستخدم للإشارة إلى شخص لديه معلومات عن الموضوع دون ذكر اسمه.'),
                    new OA\Property(property: 'category', type: 'string', example: 'مصطلحات الأخبار'),
                    new OA\Property(property: 'is_active', type: 'boolean', example: true)
                ]
            )
        ),
        responses: [new OA\Response(response: 201, description: 'Term created successfully')]
    )]
    public function store(Request $request)
    {
        $data = $request->validate([
            'word' => ['required', 'string', 'max:255', 'unique:terms,word'],
            'meaning' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $term = Term::create($data);

        return response()->json(['success' => true, 'term' => $term], 201);
    }

    #[OA\Get(
        path: '/api/terms/{id}',
        summary: 'Get a single media term',
        tags: ['Terms'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [new OA\Response(response: 200, description: 'Term details')]
    )]
    public function show($id)
    {
        return response()->json(Term::findOrFail($id));
    }

    #[OA\Put(
        path: '/api/terms/{id}',
        summary: 'Update a media term',
        tags: ['Terms'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'word', type: 'string', example: 'مصدر رسمي'),
                    new OA\Property(property: 'meaning', type: 'string', example: 'جهة أو شخص مخول بالتصريح باسم مؤسسة أو حكومة.'),
                    new OA\Property(property: 'category', type: 'string', example: 'مصطلحات الأخبار'),
                    new OA\Property(property: 'is_active', type: 'boolean', example: true)
                ]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Term updated successfully')]
    )]
    public function update(Request $request, $id)
    {
        $term = Term::findOrFail($id);

        $data = $request->validate([
            'word' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('terms', 'word')->ignore($term->id)],
            'meaning' => ['sometimes', 'required', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $term->update($data);

        return response()->json(['success' => true, 'term' => $term]);
    }

    #[OA\Delete(
        path: '/api/terms/{id}',
        summary: 'Delete a media term',
        tags: ['Terms'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [new OA\Response(response: 200, description: 'Term deleted successfully')]
    )]
    public function destroy($id)
    {
        Term::destroy($id);

        return response()->json(['success' => true]);
    }

    #[OA\Post(
        path: '/api/terms/match',
        summary: 'Find media terms used in a text',
        tags: ['Terms'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                required: ['text'],
                properties: [
                    new OA\Property(property: 'text', type: 'string', example: 'نقلت وسائل الإعلام عن مصدر مطلع تفاصيل الخبر العاجل.')
                ]
            )
        ),
        responses: [new OA\Response(response: 200, description: 'Matched terms')]
    )]
    public function match(Request $request)
    {
        $data = $request->validate([
            'text' => ['required', 'string'],
        ]);

        $normalizedText = $this->normalizeArabic($data['text']);

        $matches = Term::active()
            ->orderByRaw('LENGTH(word) DESC')
            ->get()
            ->filter(function (Term $term) use ($normalizedText) {
                return str_contains($normalizedText, $this->normalizeArabic($term->word));
            })
            ->map(function (Term $term) use ($data) {
                return [
                    'id' => $term->id,
                    'word' => $term->word,
                    'meaning' => $term->meaning,
                    'category' => $term->category,
                    'occurrences' => $this->findOccurrences($data['text'], $term->word),
                ];
            })
            ->values();

        return response()->json([
            'matches' => $matches,
            'count' => $matches->count(),
        ]);
    }

    private function normalizeArabic(string $text): string
    {
        $text = mb_strtolower($text, 'UTF-8');
        $text = preg_replace('/[\x{064B}-\x{065F}\x{0670}]/u', '', $text);

        return trim($text ?? '');
    }

    private function findOccurrences(string $text, string $word): array
    {
        $occurrences = [];
        $offset = 0;
        $wordLength = mb_strlen($word, 'UTF-8');

        while (($position = mb_stripos($text, $word, $offset, 'UTF-8')) !== false) {
            $occurrences[] = [
                'start' => $position,
                'end' => $position + $wordLength,
                'matched_text' => mb_substr($text, $position, $wordLength, 'UTF-8'),
            ];

            $offset = $position + $wordLength;
        }

        return $occurrences;
    }
}
