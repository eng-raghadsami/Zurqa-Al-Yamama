import { contentsService } from "@services/contentsService";
import {
  apiContentToPublishedArticle,
  publishedArticleToInvestigativeReport,
} from "@services/mappers/publishedContentMapper";
import { INVESTIGATIVE_REPORTS } from "@dummy/investigativeReports";
import { PUBLISHED_CONTRIBUTIONS_DUMMY } from "@dummy/publishedContributions";
import {
  getPublishedArticleBySlug,
  listPublishedByType,
} from "@website/helpers/publishedArticlesStore";
import type { InvestigativeReport } from "@dummy/investigativeReports";

function mergeReports(items: InvestigativeReport[]): InvestigativeReport[] {
  const map = new Map<string, InvestigativeReport>();
  for (const report of items) {
    map.set(report.slug, report);
  }
  return Array.from(map.values());
}

async function loadApiReports(): Promise<InvestigativeReport[]> {
  try {
    const contents = await contentsService.list();
    return contents
      .filter((item) => item.status === "published")
      .map((item) =>
        publishedArticleToInvestigativeReport(
          apiContentToPublishedArticle(item, "report"),
        ),
      );
  } catch {
    return [];
  }
}

export const investigativeReportsService = {
  async getAll(): Promise<InvestigativeReport[]> {
    const local = listPublishedByType("report").map(publishedArticleToInvestigativeReport);
    const dummyPublished = PUBLISHED_CONTRIBUTIONS_DUMMY.filter(
      (item) => item.contentType === "report",
    ).map(publishedArticleToInvestigativeReport);
    const api = await loadApiReports();

    return mergeReports([...api, ...local, ...dummyPublished, ...INVESTIGATIVE_REPORTS]);
  },

  async getBySlug(slug: string): Promise<InvestigativeReport | undefined> {
    const localArticle = getPublishedArticleBySlug(slug);
    if (localArticle?.contentType === "report") {
      return publishedArticleToInvestigativeReport(localArticle);
    }

    const all = await this.getAll();
    return all.find((report) => report.slug === slug);
  },
};
