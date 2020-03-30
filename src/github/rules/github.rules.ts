import { Rule, Level } from "src/rule-engine/interfaces/rule-engine.interface";
import { assert } from 'chai';
import { Repository, Collaborator, BranchProtectionRules } from "../interfaces/domain.interfaces";

const hasTeamRule = (teamName: string, permission: string, level: Level) => ({
  name: `has-team-${teamName}`,
  expression: (repository: Repository) => {
    const team = repository.settings.manageAccess.teams.find((current) => current.name === teamName);

    assert.exists(team, `the team "${teamName}" is not configured`);
  },
  level: level,
  children: [{
    name: `${teamName}:${permission}-permissions`,
    expression: (team: Collaborator) => assert.equal(team.permission, permission, `the team should have permission of ${permission} and has ${team.permission}`),
    level: level
  }]
});

const hasProtectionRule = ({
  pattern, requireApprove = true, dismissStale = true, reviewOwners = true, statusCheck = true, allowForce = false, codeReviewers = 1,
}): Rule<Repository> => {
  const children: Rule<BranchProtectionRules>[] = [{
    name: 'require-approving-reviews',
    expression: (rule) => assert.equal(rule.requireApprovingReviews, requireApprove, `approving PR is ${requireApprove ? 'disabled' : 'enabled'}`),
    level: Level.ERROR,
    children: requireApprove? [{
      name: 'minimal-approves',
      expression: (rule) => assert.isAtLeast(rule.requiredApprovingReviewCount, codeReviewers, `require minimal ${codeReviewers} reviwers`),
      level: Level.ERROR
    }] : []
  }, {
    name: 'dismiss-stale',
    expression: (rule) => assert.equal(rule.dismissStale, dismissStale, `dissmiss stale is ${dismissStale ? 'disabled' : 'enabled'}`),
    level: Level.WARNING ,
  }, {
    name: 'require-review-from-code-owners',
    expression: (rule) => assert.equal(rule.requireReviewFromCodeOwners, reviewOwners, `require review from Code Owners is ${reviewOwners ? 'disabled' : 'enabled'}`),
    level: Level.ERROR
  }, {
    name: 'require-status-checks',
    expression: (rule) => assert.equal(rule.requireStatusChecksToPassBeforeMerging, statusCheck, `require status check is ${statusCheck ? 'disabled' : 'enabled'}`),
    level: Level.CRITICAL,
    children: statusCheck ? [{
      name: 'continuous-integration',
      expression: (rule) => {
        const hook = rule.statusChecks.find((query) => query === 'continuous-integration/jenkins/branch');

        assert.isNotNull(hook, 'continuous-integration/jenkins/branch is required');
      },
      level: Level.ERROR
    }, {
      name: 'branch-updated',
      expression: (rule) => assert.equal(rule.requireBranchesToBeUpToDataBeforeMerging, true, 'Require branches to be up to date before merging is disabled'),
      level: Level.WARNING
    }] : []
  }, {
    name: 'signed-commits',
    expression: (rule) => assert.isTrue(rule.requireSignedCommits, 'required Signed Commit is mandatory'),
    level: Level.CRITICAL
  }, {
    name: 'force-push',
    expression: (rule) => assert.equal(rule.allowForcePushes, allowForce, `Allow force push is ${allowForce ? 'disabled' : 'enabled'}`),
    level: Level.ERROR
  }, {
      name: 'include-admins',
      expression: (rule) => assert.isTrue(rule.includeAdministrators, 'Include Administrator is disable'),
      level: Level.CRITICAL
  }];

  return {
    name: `protection-rule-${pattern}`,
    expression: (repository: Repository) => {
      const rule = repository.settings.branches.protectionRules.find((current) => current.pattern === pattern);
  
      assert.isNotNull(rule, `the ${pattern} rule is not configured`);
    },
    level: Level.ERROR,
    children
  };
}

const protectionAllBranch = () => hasProtectionRule({
  pattern: '**/**',
  requireApprove: false,
  dismissStale: false,
  reviewOwners: false,
  statusCheck: false,
  allowForce: true,
});

export const GithubRules: Rule<Repository>[] = [
  {
    name: 'repo-description',
    expression: (repository) => assert.isNotNull(repository.description, 'the repository does not have a description'),
    level: Level.WARNING,
  }, {
    name: 'private-repository',
    expression: (repository) => assert.isTrue(repository.isPrivate, 'the repository is not private'),
    level: Level.CRITICAL,
  }, {
    name: 'pages-disabled',
    expression: (repository) => assert.isFalse(repository.settings.general.githubPages, 'the repository has pages'),
    level: Level.CRITICAL,
  }, {
    name: 'dependency-graph',
    expression: (repository) => assert.isTrue(repository.settings.general.dataServices.dependecyGraph, 'the repository does not have configured dependency graph'),
    level: Level.ERROR
  }, {
    name: 'security-alerts',
    expression: (repository) => assert.isTrue(repository.settings.general.dataServices.securityAlerts, 'the repository does not have configured security alerts'),
    level: Level.CRITICAL
  }, {
    name: 'allow-commits',
    expression: (repository) => assert.isTrue(repository.settings.general.mergeButton.allowMergeCommits, 'the commit buttons is disabled'),
    level: Level.ERROR
  }, {
    name: 'disabled-squash',
    expression: (repository) => assert.isFalse(repository.settings.general.mergeButton.allowSquashMerging, 'the squash buttons is enable'),
    level: Level.CRITICAL
  }, {
    name: 'disabled-rebase',
    expression: (repository) => assert.isFalse(repository.settings.general.mergeButton.allowRebaseMerging, 'the rebase buttons is enable'),
    level: Level.CRITICAL
  }, {
    name: 'automatically-delete-branch',
    expression: (repository) => assert.isTrue(repository.settings.general.mergeButton.allowRebaseMerging, 'the branchs are not remove automatically'),
    level: Level.WARNING
  },
  hasTeamRule('sf-team', 'pull', Level.WARNING),
  hasTeamRule('sf-leads', 'admin', Level.WARNING),
  hasTeamRule('cc-admins', 'admin', Level.WARNING),
  hasTeamRule('cc-leads', 'admin', Level.WARNING),
  {
    name: 'no-direct-people',
    expression: (repository) => {
      const total = repository.settings.manageAccess.users.length;
      assert.equal(0, total, `the repository has configured ${total} people directly and should have 0`);
    },
    level: Level.WARNING
  },
  hasProtectionRule({ pattern: 'master', codeReviewers: 2 }),
  hasProtectionRule({ pattern: 'develop' }),
  hasProtectionRule({ pattern: 'release/*' }),
  hasProtectionRule({ pattern: 'hotfix/*' }),
  protectionAllBranch(),
  {
    name: 'vulenerabilities',
    expression: (repository) => assert.isAtMost(repository.vulnerabilities.length, 0, 'the repository has vulnerabilities'),
    level: Level.CRITICAL
  }
];
