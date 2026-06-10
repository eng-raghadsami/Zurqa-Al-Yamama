<?php

namespace App\Services;

class JsonExtractionService
{
    /**
     * Try to extract a JSON object from a text blob.
     * - Handles cases where model wraps JSON with ```json ... ```
     * - Handles cases where extra text appears before/after JSON
     */
    public function extractJsonObject(string $text): ?array
    {
        $text = trim($text);
        if ($text === '') {
            return null;
        }

        // Remove fenced code blocks
        $text = preg_replace('/```json\s*/i', '', $text);
        $text = preg_replace('/```\s*/', '', $text);

        // If it's already a pure JSON object
        $direct = json_decode($text, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($direct)) {
            return $direct;
        }

        // Find the first '{' and last '}' and attempt decode on that slice
        $start = strpos($text, '{');
        $end = strrpos($text, '}');
        if ($start === false || $end === false || $end <= $start) {
            return null;
        }

        $slice = substr($text, $start, $end - $start + 1);
        $decoded = json_decode($slice, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            return $decoded;
        }

        return null;
    }
}

