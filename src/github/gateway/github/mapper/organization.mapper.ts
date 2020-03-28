import { Injectable } from '@nestjs/common';
import { OrganizationGithub, RepositoryGithub } from '../interfaces/github.interfaces';
import { TeamApi } from '../../github-api/interfaces/github-api.interfaces';
import { CollaboratorGraphql, BranchGraphql, BranchProtectionRuleGraphql } from '../../github-graphql/interfaces/graphql.interfaces';
import { Organization, Repository, Collaborator } from '../../../interfaces/domain.interfaces';

@Injectable()
export class OrganizationMapper {
  transform(organization: OrganizationGithub): Organization {
    return ({
      organization: organization.name,
      repositories: organization.repositories.nodes.map((repo) => this.repositoryTransform(repo)),
    });
  }

  private repositoryTransform(node: RepositoryGithub): Repository {
    return ({
      name: node.name,
      lastUpdated: node.pushedAt,
      isPrivate: node.isPrivate,
      settings: {
        general: {
          isTemplate: node.isTemplate,
          wikis: node.hasWikiEnabled,
          issues: node.hasIssuesEnabled,
          allowForking: 'PENDING!!!',
          sponsorships: 'PENDING!!!',
          projects: node.hasProjectsEnabled,
          dataServices: {
            dependecyGraph: node.dependencyGraphManifests.nodes.length !== 0,
            securityAlerts: node.additionalData.isVulnerabilitiChecked,
          },
          mergeButton: {
            allowMergeCommits: node.mergeCommitAllowed,
            allowSquashMerging: node.squashMergeAllowed,
            allowRebaseMerging: node.rebaseMergeAllowed,
          },
          automaticallyDeleteHeadBranches: node.deleteBranchOnMerge,
          githubPages: node.additionalData.has_pages,
        },
        manageAccess: {
          teams: node.additionalData.teams.map(this.teamTransform),
          users: node.collaborators.edges.map(this.collaboratorTransform),
        },
        branches: {
          default: node.defaultBranchRef ? node.defaultBranchRef.name : undefined,
          protectionRules: node.branchProtectionRules.nodes.map(this.protectionRulesTransform),
        },
      },
      branches: node.refs.nodes.map(this.branchTransform),
      files: {
        develop: [{
          name: '.github/CODEOWNERS',
          content: node.developCodeOwner ? node.developCodeOwner.text : undefined,
        }],
        master: [{
          name: '.github/CODEOWNERS',
          content: node.masterCodeOwner ? node.masterCodeOwner.text : undefined,
        }]
      },
    });
  }

  private teamTransform(node: TeamApi) {
    return {
      name: node.name,
      permission: node.permission
    };
  }

  private collaboratorTransform(collaborator: CollaboratorGraphql): Collaborator {
    return {
      name: collaborator.node.login,
      permission: collaborator.permission
    };
  }

  private branchTransform(branch: BranchGraphql) {
    return {
      name: branch.name,
      updated: branch.target.committedDate
    };
  }

  private protectionRulesTransform(node: BranchProtectionRuleGraphql) {
    return {
      pattern: node.pattern,
      requirePullRequestReviewsBeforeMerging: 'PENDING!!!',
      requireApprovingReviews: node.requiresApprovingReviews,
      dismissStale: node.dismissesStaleReviews,
      requireReviewFromCodeOwners: node.requiresCodeOwnerReviews,
      restricWhoCanDismissPullRequestReview: node.restrictsReviewDismissals,
      requireStatusChecksToPassBeforeMerging: node.requiresStatusChecks,
      requireBranchesToBeUpToDataBeforeMerging: node.requiresStrictStatusChecks,
      statusChecks: node.requiredStatusCheckContexts,
      requireSignedCommits: node.requiresCommitSignatures,
      includeAdministrators: node.isAdminEnforced,
      restricWhoCanPushToMatchingBranches: 'PENDING!!!',
      allowForcePushes: !node.restrictsPushes,
      allowDeletions: 'PENDING!!!',
      requiredApprovingReviewCount: node.requiredApprovingReviewCount,
    };
  }
}
