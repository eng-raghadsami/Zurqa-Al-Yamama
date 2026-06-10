import { imagesService } from "@services/imagesService";
import {
  mapApiImageAnalysis,
  mapApiTextAnalysis,
} from "@services/mappers/contentAnalysisMapper";
import type { ImageAnalysisResult as ApiImageAnalysisResult } from "@services/api/types";
import { textsService } from "@services/textsService";
import type { ImageAnalysisResult, TextAnalysisResult } from "@website/types/contentAnalysis";

function hasImageScores(api: ApiImageAnalysisResult): boolean {
  if (api.criteria_scores && Object.keys(api.criteria_scores).length > 0) return true;
  if (api.analysis?.criteria_scores && Object.keys(api.analysis.criteria_scores).length > 0) {
    return true;
  }
  return (
    typeof api.racism === "number" ||
    typeof api.violence === "number" ||
    typeof api.sensitive_content === "number" ||
    typeof api.blood === "number" ||
    typeof api.forged_percentage === "number" ||
    typeof api.ai_generated_percentage === "number"
  );
}

function hasTextAnalysisScores(api: Awaited<ReturnType<typeof textsService.analyze>>): boolean {
  const attrs = api.perspective?.attributeScores;
  return Boolean(attrs && Object.keys(attrs).length > 0);
}

export async function analyzeContentText(
  title: string,
  body: string,
): Promise<TextAnalysisResult> {
  const text = [title.trim(), body.trim()].filter(Boolean).join("\n\n");
  const apiResult = await textsService.analyze({ text });

  if (!hasTextAnalysisScores(apiResult)) {
    throw new Error("رد الخادم لا يحتوي على معايير تحليل نصي صالحة");
  }

  return mapApiTextAnalysis(apiResult, title, body);
}

export async function analyzeContentImage(file: File): Promise<ImageAnalysisResult> {
  const apiResult = await imagesService.analyze(file);

  if (!hasImageScores(apiResult)) {
    throw new Error("رد الخادم لا يحتوي على معايير تحليل صورة صالحة");
  }

  return mapApiImageAnalysis(apiResult);
}
