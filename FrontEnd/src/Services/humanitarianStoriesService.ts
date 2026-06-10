import { contentsService } from "@services/contentsService";
import {
  apiContentToPublishedArticle,
  publishedArticleToHumanitarianStory,
} from "@services/mappers/publishedContentMapper";
import { HUMANITARIAN_STORIES } from "@dummy/humanitarianStories";
import { PUBLISHED_CONTRIBUTIONS_DUMMY } from "@dummy/publishedContributions";
import {
  listPublishedByType,
  getPublishedArticleBySlug,
} from "@website/helpers/publishedArticlesStore";
import type { HumanitarianStory } from "@dummy/humanitarianStories";

function mergeStories(items: HumanitarianStory[]): HumanitarianStory[] {
  const map = new Map<string, HumanitarianStory>();
  for (const story of items) {
    map.set(story.slug, story);
  }
  return Array.from(map.values());
}

async function loadApiStories(): Promise<HumanitarianStory[]> {
  try {
    const contents = await contentsService.list();
    return contents
      .filter((item) => item.status === "published")
      .map((item) =>
        publishedArticleToHumanitarianStory(
          apiContentToPublishedArticle(item, "story"),
        ),
      );
  } catch {
    return [];
  }
}

export const humanitarianStoriesService = {
  async getAll(): Promise<HumanitarianStory[]> {
    const local = listPublishedByType("story").map(publishedArticleToHumanitarianStory);
    const dummyPublished = PUBLISHED_CONTRIBUTIONS_DUMMY.filter(
      (item) => item.contentType === "story",
    ).map(publishedArticleToHumanitarianStory);
    const api = await loadApiStories();

    return mergeStories([...api, ...local, ...dummyPublished, ...HUMANITARIAN_STORIES]);
  },

  async getBySlug(slug: string): Promise<HumanitarianStory | undefined> {
    const localArticle = getPublishedArticleBySlug(slug);
    if (localArticle?.contentType === "story") {
      return publishedArticleToHumanitarianStory(localArticle);
    }

    const all = await this.getAll();
    return all.find((story) => story.slug === slug);
  },
};
