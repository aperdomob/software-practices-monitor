import { Injectable } from '@nestjs/common';
import { GithubApiService } from '../github-api/github-api.gateway.service';
import { GithubGraphqlService } from '../github-graphql/github-graphql.gateway.service';
import { ConfigService } from '@nestjs/config';
import { OrganizationMapper } from './mapper/organization.mapper';
import { Organization } from '../../interfaces/domain.interfaces';

@Injectable()
export class GithubGateway {
  constructor(
    private readonly githubApiService: GithubApiService,
    private readonly githubGraphqlService: GithubGraphqlService,
    private readonly organizationMapper: OrganizationMapper,
    private readonly configService: ConfigService,
  ) { }

  async scanOrganization(): Promise<Organization> {
    // return this.githubApiService.getRepositories( { org: 'xxx' });

    const organization = await this.githubGraphqlService.getOrganization({
      org: this.configService.get<string>('github.organization'),
    });

    const additionalData = await Promise.all(organization.repositories.nodes.map(async (repository) => {
      const [repo, isVulnerabilitiChecked, teams] = await Promise.all([
        this.githubApiService.getRepository({ owner: organization.login, repo: repository.name }),
        this.githubApiService.checkVulnerabilityAlerts({ owner: organization.login, repo: repository.name }),
        this.githubApiService.getTeams({ owner: organization.login, repo: repository.name })
      ]);

      return {
        ...repository,
        additionalData: {
          ...repo.data,
          ...{ isVulnerabilitiChecked, teams }
        }
      };
    }));

    const allOrganizationData = {
      name: organization.name,
      login: organization.login,
      repositories: {
        nodes: additionalData,
      },
    };

    return this.organizationMapper.transform(allOrganizationData);
  }
}
