import { contentsService } from "@services/contentsService";
import { publishedContentApiService } from "@services/publishedContentApiService";
import { reviewsService } from "@services/reviewsService";
import { submissionToPublishedArticle } from "@services/mappers/publishedContentMapper";
import { MY_SPACE_USER } from "@website/types/mySpace";
import {
  addCertificate,
  buildReferenceCode,
  type IntegrityCertificate,
} from "@website/helpers/integrityCertificatesStore";
import { addPublishedArticle } from "@website/helpers/publishedArticlesStore";
import { clearPublishedLookupCache } from "@website/helpers/resolvePublishedRecordId";
import { slugifyTitle } from "@website/helpers/slugify";
import {
  addSubmission,
  getSubmission,
  listPendingSubmissions,
  updateSubmission,
} from "@website/helpers/contentSubmissionsStore";
import type { ContentSubmission } from "@website/types/contentSubmission";

const DEFAULT_USER_ID = 1;
const DEFAULT_EDITOR_ID = 2;
const DEFAULT_CATEGORY_ID = 1;

export type SubmitContentInput = Omit<
  ContentSubmission,
  "id" | "slug" | "submittedAt" | "status" | "apiContentId" | "contributorName"
>;

export type ApproveContentInput = {
  submissionId: string;
  integrityScore: number;
  notes?: string;
  authorName?: string;
};

export type PublishResult = {
  submission: ContentSubmission;
  certificate: IntegrityCertificate;
  apiSynced: boolean;
  apiErrors: string[];
};

export const contentSubmissionService = {
  async listPending(): Promise<ContentSubmission[]> {
    let apiPending: ContentSubmission[] = [];

    try {
      const contents = await contentsService.list();
      apiPending = contents
        .filter((item) => item.status === "submitted")
        .map((item) => ({
          id: `api-pending-${item.id}`,
          slug: slugifyTitle(item.title, String(item.id)),
          contentType: "verified_news" as const,
          title: item.title,
          body: item.body,
          coverPreviewUrl: null,
          coverBlurLevel: 0,
          coverRemoved: true,
          textAnalysis: null,
          imageAnalysis: null,
          integrityScore: 0,
          submittedAt: item.created_at ?? new Date().toISOString(),
          contributorRole: "مساهم (API)",
          contributorName: "مساهم المنصة",
          status: "pending_review" as const,
          apiContentId: item.id,
        }));
    } catch {
      apiPending = [];
    }

    const localPending = listPendingSubmissions();
    const localIds = new Set(localPending.map((item) => item.apiContentId).filter(Boolean));

    const merged = [
      ...localPending,
      ...apiPending.filter((item) => !localIds.has(item.apiContentId)),
    ];

    return merged.sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    );
  },

  async submitForReview(input: SubmitContentInput): Promise<ContentSubmission> {
    const id = `sub-${Date.now()}`;
    const slug = slugifyTitle(input.title || "مسودة", id);
    const contributorName = MY_SPACE_USER.name;
    const apiErrors: string[] = [];
    let apiContentId: number | null = null;

    try {
      const created = await contentsService.create({
        title: input.title || "مسودة بدون عنوان",
        body: input.body,
        user_id: DEFAULT_USER_ID,
        category_id: DEFAULT_CATEGORY_ID,
        status: "submitted",
      });
      apiContentId = created.id;
    } catch (error) {
      apiErrors.push(
        error instanceof Error ? error.message : "تعذّر حفظ المحتوى على الخادم",
      );
    }

    const submission: ContentSubmission = {
      ...input,
      id,
      slug,
      contributorName,
      apiContentId,
      submittedAt: new Date().toISOString(),
      status: "pending_review",
    };

    addSubmission(submission);

    if (apiErrors.length > 0) {
      console.warn("[contentSubmissionService] submit fallback:", apiErrors.join(" | "));
    }

    return submission;
  },

  async getById(id: string): Promise<ContentSubmission | undefined> {
    const local = getSubmission(id);
    if (local) return local;
    const pending = await this.listPending();
    return pending.find((item) => item.id === id);
  },

  async approveAndPublish(input: ApproveContentInput): Promise<PublishResult> {
    const submission = await this.getById(input.submissionId);
    if (!submission) {
      throw new Error("المساهمة غير موجودة");
    }

    const authorName = input.authorName ?? submission.contributorName;
    const apiErrors: string[] = [];
    let apiSynced = false;
    let publishedRecordId = submission.publishedRecordId ?? null;

    if (submission.apiContentId) {
      try {
        await contentsService.update(submission.apiContentId, { status: "published" });
        apiSynced = true;
      } catch (error) {
        apiErrors.push(
          error instanceof Error ? error.message : "تعذّر تحديث حالة المحتوى",
        );
      }

      try {
        await reviewsService.create({
          content_id: submission.apiContentId,
          editor_id: DEFAULT_EDITOR_ID,
          decision: "accepted",
          comments: input.notes,
        });
        apiSynced = true;
      } catch (error) {
        apiErrors.push(
          error instanceof Error ? error.message : "تعذّر تسجيل المراجعة",
        );
      }

      try {
        const published = await publishedContentApiService.create({
          content_id: submission.apiContentId,
          journalist_id: DEFAULT_USER_ID,
          editor_id: DEFAULT_EDITOR_ID,
          published_at: new Date().toISOString(),
        });
        publishedRecordId = published.id;
        clearPublishedLookupCache();
        apiSynced = true;
      } catch (error) {
        apiErrors.push(
          error instanceof Error ? error.message : "تعذّر إنشاء سجل النشر",
        );
      }
    }

    const updatedSubmission: ContentSubmission = {
      ...submission,
      status: "approved",
      integrityScore: input.integrityScore,
      publishedAt: new Date().toISOString(),
      publishedRecordId,
    };

    if (getSubmission(submission.id)) {
      updateSubmission(submission.id, {
        status: "approved",
        integrityScore: input.integrityScore,
        publishedAt: updatedSubmission.publishedAt,
        publishedRecordId,
      });
    } else {
      addSubmission(updatedSubmission);
    }

    const publishedArticle = submissionToPublishedArticle(
      { ...updatedSubmission, integrityScore: input.integrityScore },
      authorName,
    );
    addPublishedArticle(publishedArticle);

    const certificate: IntegrityCertificate = {
      id: `cert-${submission.id}`,
      referenceCode: buildReferenceCode(submission.id, input.integrityScore),
      submissionId: submission.id,
      title: submission.title,
      authorName,
      contributorRole: submission.contributorRole,
      integrityScore: input.integrityScore,
      issuedAt: new Date().toISOString(),
      contentType: submission.contentType,
      badges: [
        { label: "توثيق المصادر", status: "confirmed" },
        { label: "خلو من الانحياز", status: "confirmed" },
        { label: "سلامة الوسائط", status: "confirmed" },
      ],
    };

    addCertificate(certificate);

    return {
      submission: updatedSubmission,
      certificate,
      apiSynced,
      apiErrors,
    };
  },
};
