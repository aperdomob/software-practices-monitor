import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubApiGateway {
  private octokit: Octokit;

  constructor(private readonly configService: ConfigService) {
    this.octokit = new Octokit({
      auth: configService.get<string>('github.token'),
    });
  }

  async checkVulnerabilityAlerts({ owner, repo }): Promise<boolean> {
    try {
      await this.octokit.repos.checkVulnerabilityAlerts({
        owner,
        repo,
      });

      return true;
    } catch (ex) {
      return false;
    }
  }

  async getRepository({ owner, repo }): Promise<any> {
    const repository = await this.octokit.repos.get({ owner, repo });

    return repository.data;
  }

  async getTeams({ owner, repo }): Promise<any> {
    const teams = await this.octokit.repos.listTeams({ owner, repo });

    return teams.data;
  }

  async getRepositories({ org }): Promise<any> {
    const repositories = await this.octokit.repos.listForOrg({ org });

    return repositories.data;
  }
}
