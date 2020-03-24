export const repositoryFromOrganizationQuery = `
query($organizationName: String!, $numberOfRepositories: Int!) {
  organization(login: $organizationName) {
    name
    repositories(first: $numberOfRepositories) {
      nodes {
        name
        description
        deleteBranchOnMerge
        hasIssuesEnabled
        hasProjectsEnabled
        hasWikiEnabled
        isPrivate
        isTemplate
        mergeCommitAllowed
        pushedAt
        rebaseMergeAllowed
        squashMergeAllowed
        viewerPermission
        fundingLinks {
          url
        }
        licenseInfo {
          name
        }
        masterCodeOwner: object(expression: "master:.github/CODEOWNERS") {
          ... on Blob {
            text
          }
        }
        developCodeOwner: object(expression: "develop:.github/CODEOWNERS") {
          ... on Blob {
            text
          }
        }
        dependencyGraphManifests(first: 1) {
          nodes {
            id
          }
        }
        defaultBranchRef {
          name
        }
        collaborators(first: 100, affiliation: DIRECT) {
          edges {
            permission
            node {
              login
            }
          }
        }
        branchProtectionRules(first: 100) {
          nodes {
            pattern
            isAdminEnforced
            requiresApprovingReviews
            requiredApprovingReviewCount
            requiredStatusCheckContexts
            requiresApprovingReviews
            requiresCodeOwnerReviews
            requiresCommitSignatures
            requiresStatusChecks
            requiresStrictStatusChecks
            restrictsPushes
            restrictsReviewDismissals
            dismissesStaleReviews
            pushAllowances(first: 0) {
              nodes {
                id
              }
            }
          }
        }
        refs(first: 100, refPrefix: "refs/heads/") {
          nodes {
            name
            target {
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }
  }
}
`;
