export interface Collaborator {
  name: string;
  permission: string;
}

export interface BranchProtectionRules {
  pattern: string;
  requirePullRequestReviewsBeforeMerging: string;
  requireApprovingReviews: boolean;
  dismissStale: boolean;
  requireReviewFromCodeOwners: boolean;
  restricWhoCanDismissPullRequestReview: boolean;
  requireStatusChecksToPassBeforeMerging: boolean;
  requireBranchesToBeUpToDataBeforeMerging: boolean;
  statusChecks: string[];
  requireSignedCommits: boolean;
  includeAdministrators: boolean;
  restricWhoCanPushToMatchingBranches: string;
  allowForcePushes: boolean;
  allowDeletions: string;
  requiredApprovingReviewCount: number;
}

export interface GeneralSettings {
  isTemplate: boolean;
  wikis: boolean;
  issues: boolean;
  allowForking: string;
  sponsorships: string;
  projects: boolean;
  dataServices: {
    dependecyGraph: boolean;
    securityAlerts: boolean;
  };
  mergeButton: {
    allowMergeCommits: boolean;
    allowSquashMerging: boolean;
    allowRebaseMerging: boolean;
  };
  automaticallyDeleteHeadBranches: boolean;
  githubPages: boolean;
}

export interface Setting {
  general: GeneralSettings;
  manageAccess: {
    teams: Collaborator[];
    users: Collaborator[];
  };
  branches: {
    default: string;
    protectionRules: BranchProtectionRules[];
  };
}

export interface Branch {
  name: string;
  updated: string;

}

export interface File {
  name: string;
  content: string;
}

export interface Repository {
  name: string;
  lastUpdated: string;
  isPrivate: boolean;
  settings: Setting;
  branches: Branch[];
  files: {
    develop: File[];
    master: File[];
  },
}

export interface Organization {
  organization: string;
  repositories: Repository[];
}
