import { Injectable } from '@nestjs/common';
import * as ocktokit from '@octokit/graphql';
import { graphql } from '@octokit/graphql/dist-types/types';
import { repositoryFromOrganizationQuery } from './assets/get-repositories-from-organization';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class GithubGraphqlService {
  private query: graphql;

  constructor(private readonly configService: ConfigService) {
    this.query = ocktokit.graphql.defaults({
      headers: {
        authorization: `token ${configService.get<string>('github.token')}`,
        Accept: 'application/vnd.github.hawkgirl-preview+json',
      }
    })
  }

  public async getOrganization({ org }) {
    const { organization } = await this.query(
      repositoryFromOrganizationQuery, {
      organizationName: org,
      numberOfRepositories: 1,
    });

    return organization;
  }
}