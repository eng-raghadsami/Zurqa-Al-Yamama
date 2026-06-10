import { WEBSITE_ROUTES } from "@core/constants/routes";

export type VerificationMenuItem = {
  id: string;
  label: string;
  to: string;
  comingSoon?: boolean;
};

export function getVerificationMenuItems(isLoggedIn: boolean): VerificationMenuItem[] {
  const items: VerificationMenuItem[] = [
    {
      id: "image",
      label: "تحقق من الصور",
      to: WEBSITE_ROUTES.VERIFICATION_IMAGE,
    },
    {
      id: "video",
      label: "تحقق من الفيديوهات",
      to: WEBSITE_ROUTES.VERIFICATION_VIDEO,
      comingSoon: true,
    },
  ];

  if (isLoggedIn) {
    items.push({
      id: "manual-content",
      label: "تحقق من محتوى يدوي",
      to: WEBSITE_ROUTES.CONTENT_SETUP_NEW,
    });
  }

  items.push({
    id: "disinformation",
    label: "مكافحة التضليل",
    to: WEBSITE_ROUTES.EDITOR_DISINFORMATION_ARCHIVE,
  });

  return items;
}
