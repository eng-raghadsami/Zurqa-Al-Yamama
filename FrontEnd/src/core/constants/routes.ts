/**
 * core/constants/routes.ts
 * Single source of truth for all application route paths.
 * Import these constants everywhere instead of using raw strings.
 */

export const WEBSITE_ROUTES = {
  HOME: "/",
  REPORTS: "/reports",
  REPORTS_INVESTIGATIVE: "/reports/investigative",
  REPORTS_HUMANITARIAN: "/reports/humanitarian",
  REPORTS_SOCIAL: "/reports/social",
  REPORTS_ECONOMIC: "/reports/economic",
  REPORTS_ENVIRONMENTAL: "/reports/environmental",
  STORIES: "/stories",
  STORIES_HUMANITARIAN: "/stories/humanitarian",
  STORIES_JOURNALISTIC: "/stories/journalistic",
  STORIES_SUCCESS: "/stories/success",
  STORIES_COMMUNITY: "/stories/community",
  STORIES_WOMEN: "/stories/women",
  STORIES_CHILDREN: "/stories/children",
  STORIES_YOUTH: "/stories/youth",
  VISUALS: "/visuals",
  VISUALS_VIDEO: "/visuals/video",
  VISUALS_VISUAL_REPORTS: "/visuals/visual-reports",
  VISUALS_SHORT_FILMS: "/visuals/short-films",
  VISUALS_ILLUSTRATED_STORIES: "/visuals/illustrated-stories",
  VISUALS_INTERVIEWS: "/visuals/interviews",
  PODCASTS: "/podcasts",
  VERIFICATION: "/verification",
  VERIFICATION_NEWS: "/verification/news",
  VERIFICATION_IMAGE: "/verification/image",
  VERIFICATION_VIDEO: "/verification/video",
  VERIFICATION_DISINFORMATION: "/verification/disinformation",
  VERIFICATION_ARCHIVE: "/verification/archive",
  MEDIA_LITERACY: "/media-literacy",
  MEDIA_TERMINOLOGY: "/media-terminology",
  ABOUT: "/about",
  ABOUT_PUBLISHING_POLICIES: "/about/publishing-policies",
  VERIFIED_NEWS: "/verified-news",
  verifiedNewsDetail: (slug: string) => `/verified-news/${slug}` as const,
  investigativeReportDetail: (slug: string) =>
    `/reports/investigative/${slug}` as const,
  humanitarianStoryDetail: (slug: string) =>
    `/stories/humanitarian/${slug}` as const,
  MY_SPACE: "/my-space",
  CONTENT_SETUP_NEW: "/my-space/content/new",
  CONTENT_SETUP_COVER: "/my-space/content/cover",
  CONTENT_SETUP_WRITE: "/my-space/content/write",
  CONTENT_SETUP_ANALYSIS: "/my-space/content/analysis",
  CONTENT_SETUP_PENDING: "/my-space/content/pending",
  MY_SPACE_CERTIFICATES: "/my-space/certificates",
  integrityCertificateDetail: (id: string) => `/my-space/certificates/${id}` as const,
  EDITOR_DASHBOARD: "/editor-space/dashboard",
  EDITOR_EXPERT_REVIEW: "/editor-space/expert-review",
  editorExpertReviewDetail: (id: string) => `/editor-space/expert-review/${id}` as const,
  EDITOR_SPACE: "/editor-space",
  EDITOR_DISINFORMATION_ARCHIVE: "/editor-space/disinformation-archive",
} as const;

export const ADMIN_ROUTES = {
  ROOT: "/admin",
  DASHBOARD: "/admin/dashboard",
  USERS: "/admin/users",
  REPORTS: "/admin/reports",
  STORIES: "/admin/stories",
  PODCASTS: "/admin/podcasts",
  VERIFICATION_REQUESTS: "/admin/verification-requests",
  MEDIA_LIBRARY: "/admin/media-library",
  CATEGORIES: "/admin/categories",
  SETTINGS: "/admin/settings",
} as const;

/** Use for links that do not have a page yet */
export const PLACEHOLDER_ROUTE = "#" as const;

const IMPLEMENTED_ROUTE_PATHS = new Set<string>([
  WEBSITE_ROUTES.HOME,
  WEBSITE_ROUTES.REPORTS_INVESTIGATIVE,
  WEBSITE_ROUTES.STORIES_HUMANITARIAN,
  WEBSITE_ROUTES.VISUALS,
  WEBSITE_ROUTES.PODCASTS,
  WEBSITE_ROUTES.VERIFICATION_IMAGE,
  WEBSITE_ROUTES.VERIFICATION_VIDEO,
  WEBSITE_ROUTES.MEDIA_LITERACY,
  WEBSITE_ROUTES.MEDIA_TERMINOLOGY,
  WEBSITE_ROUTES.ABOUT_PUBLISHING_POLICIES,
  WEBSITE_ROUTES.VERIFIED_NEWS,
  WEBSITE_ROUTES.MY_SPACE,
  WEBSITE_ROUTES.MY_SPACE_CERTIFICATES,
  WEBSITE_ROUTES.CONTENT_SETUP_NEW,
  WEBSITE_ROUTES.EDITOR_SPACE,
  WEBSITE_ROUTES.EDITOR_DASHBOARD,
  WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW,
  WEBSITE_ROUTES.EDITOR_DISINFORMATION_ARCHIVE,
  ADMIN_ROUTES.ROOT,
]);

export function isImplementedRoute(path: string): boolean {
  if (!path || path === PLACEHOLDER_ROUTE) return false;

  const basePath = path.split("#")[0] ?? path;

  if (IMPLEMENTED_ROUTE_PATHS.has(basePath)) return true;

  return (
    (basePath.startsWith(`${WEBSITE_ROUTES.VERIFIED_NEWS}/`) &&
      basePath.length > WEBSITE_ROUTES.VERIFIED_NEWS.length + 1) ||
    (basePath.startsWith(`${WEBSITE_ROUTES.REPORTS_INVESTIGATIVE}/`) &&
      basePath.length > WEBSITE_ROUTES.REPORTS_INVESTIGATIVE.length + 1) ||
    (basePath.startsWith(`${WEBSITE_ROUTES.STORIES_HUMANITARIAN}/`) &&
      basePath.length > WEBSITE_ROUTES.STORIES_HUMANITARIAN.length + 1) ||
    (basePath.startsWith(`${WEBSITE_ROUTES.MY_SPACE}/content/`) &&
      basePath.length > `${WEBSITE_ROUTES.MY_SPACE}/content`.length + 1) ||
    basePath === WEBSITE_ROUTES.MY_SPACE_CERTIFICATES ||
    (basePath.startsWith(`${WEBSITE_ROUTES.MY_SPACE_CERTIFICATES}/`) &&
      basePath.length > WEBSITE_ROUTES.MY_SPACE_CERTIFICATES.length + 1) ||
    (basePath.startsWith(`${WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW}/`) &&
      basePath.length > WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW.length + 1)
  );
}

/** Returns the route when implemented, otherwise `#` */
export function routeOrPlaceholder(path: string): string {
  return isImplementedRoute(path) ? path : PLACEHOLDER_ROUTE;
}

export type WebsiteRoute = (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES];
export type AdminRoute = (typeof ADMIN_ROUTES)[keyof typeof ADMIN_ROUTES];
