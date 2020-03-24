import { Injectable } from '@nestjs/common';
import { GithubApiService } from '../github-api/github-api.gateway.service';
import { GithubGraphqlService } from '../github-graphql/github-graphql.gateway.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubService {
  constructor(
    private readonly githubApiService: GithubApiService,
    private readonly githubGraphqlService: GithubGraphqlService,
    private readonly configService: ConfigService) {}

  scanOrganization(): Promise<any> {
    // return this.githubApiService.getRepositories( { org: 'xxx' });
    return this.githubGraphqlService.getOrganization({
      org: this.configService.get<string>('github.organization')
    })
  }
}
