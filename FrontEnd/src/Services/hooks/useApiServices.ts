import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GLOSSARY_TERMS } from "@dummy/terminology";
import { imagesService } from "@services/imagesService";
import { textsService } from "@services/textsService";
import { termsService } from "@services/termsService";
import { mapMediaTermsToGlossary } from "@services/mappers/termsMapper";
import type { CreateMediaTermPayload } from "@services/api/types";

export const TERMS_QUERY_KEY = ["media-terms"] as const;

export function useMediaTerms() {
  return useQuery({
    queryKey: TERMS_QUERY_KEY,
    queryFn: async () => {
      try {
        const terms = await termsService.getAll();
        const mapped = mapMediaTermsToGlossary(terms);
        return mapped.length > 0 ? mapped : GLOSSARY_TERMS;
      } catch {
        return GLOSSARY_TERMS;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useMatchTermsInText() {
  return useMutation({
    mutationFn: termsService.match,
  });
}

export function useCreateMediaTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMediaTermPayload) => termsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TERMS_QUERY_KEY });
    },
  });
}

export function useAnalyzeImage() {
  return useMutation({
    mutationFn: (file: File) => imagesService.analyze(file),
  });
}

export function useDeleteMediaTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => termsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TERMS_QUERY_KEY });
    },
  });
}

export function useUpdateMediaTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: import("@services/api/types").UpdateMediaTermPayload;
    }) => termsService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TERMS_QUERY_KEY });
    },
  });
}

export function useAnalyzeText() {
  return useMutation({
    mutationFn: (text: string) => textsService.analyze({ text }),
  });
}
