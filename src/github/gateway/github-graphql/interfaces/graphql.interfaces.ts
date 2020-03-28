export interface CodeOwner {
  text: string;
}

export interface DependencyGraphManifests {
  nodes: {
    id: string;
  }[]
}

export interface DefaultBranch {
  name: string;
}

export interface CollaboratorGraphql {
  permission: string,
  node: {
    login: string
  }
}

export interface BranchProtectionRuleGraphql {
  pattern: string;
  isAdminEnforced: boolean;
  requiresApprovingReviews: boolean;
  requiredApprovingReviewCount: number;
  requiredStatusCheckContexts: string[];
  requiresCodeOwnerReviews: boolean;
  requiresCommitSignatures: boolean;
  requiresStatusChecks: boolean;
  requiresStrictStatusChecks: boolean;
  restrictsPushes: boolean;
  restrictsReviewDismissals: boolean;
  dismissesStaleReviews: boolean;
  pushAllowances: { nodes: any[] };
}

export interface BranchGraphql {
  name: string,
  target: {
    committedDate: string;
  }
}

export interface RepositoryGraphQL {
  name: string;
  description?: string;
  deleteBranchOnMerge: boolean;
  hasIssuesEnabled: boolean;
  hasProjectsEnabled: boolean;
  hasWikiEnabled: boolean;
  isPrivate: boolean;
  isTemplate: boolean;
  mergeCommitAllowed: boolean;
  pushedAt: string;
  rebaseMergeAllowed: boolean;
  squashMergeAllowed: boolean;
  viewerPermission: string;
  fundingLinks: any[];
  licenseInfo?: {
    name: string;
  }
  masterCodeOwner?: CodeOwner;
  developCodeOwner?: CodeOwner;
  dependencyGraphManifests: DependencyGraphManifests;
  defaultBranchRef?: DefaultBranch;
  collaborators: { edges: CollaboratorGraphql[] };
  branchProtectionRules: {
    nodes: BranchProtectionRuleGraphql[]
  };
  refs: {
    nodes: BranchGraphql[];
  };
}

export interface OrganizationGraphQL {
  name: string;
  login: string;
  repositories: {
    nodes: RepositoryGraphQL[]
  }
}
