import { publishedContentApiService } from "@services/publishedContentApiService";

let publishedLookupCache: Map<number, number> | null = null;
let publishedLookupPromise: Promise<Map<number, number>> | null = null;

async function loadPublishedLookup(): Promise<Map<number, number>> {
  if (publishedLookupCache) return publishedLookupCache;

  if (!publishedLookupPromise) {
    publishedLookupPromise = publishedContentApiService
      .list()
      .then((items) => {
        const map = new Map<number, number>();
        for (const item of items) {
          map.set(item.content_id, item.id);
        }
        publishedLookupCache = map;
        return map;
      })
      .catch(() => new Map<number, number>());
  }

  return publishedLookupPromise;
}

export async function resolvePublishedRecordId(input: {
  publishedRecordId?: number | null;
  apiContentId?: number | null;
}): Promise<number | null> {
  if (input.publishedRecordId) return input.publishedRecordId;
  if (!input.apiContentId) return null;

  const lookup = await loadPublishedLookup();
  return lookup.get(input.apiContentId) ?? null;
}

export function clearPublishedLookupCache() {
  publishedLookupCache = null;
  publishedLookupPromise = null;
}
