type ContributorAuth = {
  isLoggedIn: boolean;
  isJournalist: boolean;
  isMediaPractitioner: boolean;
};

export function canAccessContentSetup(auth: ContributorAuth): boolean {
  return auth.isLoggedIn && (auth.isJournalist || auth.isMediaPractitioner);
}

export function canSelectVerifiedNews(auth: Pick<ContributorAuth, "isJournalist">): boolean {
  return auth.isJournalist;
}
