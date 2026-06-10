import { WEBSITE_ROUTES } from "@core/constants/routes";

export function getVerificationCta(pathname: string) {
  if (pathname.startsWith(WEBSITE_ROUTES.VERIFICATION_IMAGE)) {
    return {
      to: WEBSITE_ROUTES.VERIFICATION_VIDEO,
      label: "التحقق من الفيديوهات",
      icon: "videocam" as const,
    };
  }

  if (pathname.startsWith(WEBSITE_ROUTES.VERIFICATION_VIDEO)) {
    return {
      to: WEBSITE_ROUTES.VERIFICATION_IMAGE,
      label: "تحقق من الصور الآن",
      icon: "image" as const,
    };
  }

  return {
    to: WEBSITE_ROUTES.VERIFICATION_IMAGE,
    label: "تقديم ملف للتحقق",
    icon: "add" as const,
  };
}
