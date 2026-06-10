export type ContentSetupType = "report" | "story" | "verified_news" | "article";

export type ContentSetupStepId = "type" | "cover" | "write" | "analysis" | "pending";

export type ContentSetupStep = {
  id: ContentSetupStepId;
  label: string;
  shortLabel: string;
  icon: string;
};

export type ContentTypeOption = {
  id: ContentSetupType;
  label: string;
  description: string;
  icon: string;
  accent: "gold" | "primary" | "teal";
  available: boolean;
  journalistOnly?: boolean;
  comingSoon?: boolean;
};
