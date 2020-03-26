import { OrganizationGraphQL, RepositoryGraphQL } from "../../github-graphql/interfaces/graphql.interfaces";
import { RepositoryApi } from "../../github-api/interfaces/github-api.interfaces";

export interface RepositoryGithub extends RepositoryGraphQL {
  additionalData: RepositoryApi;
}

export interface OrganizationGithub extends OrganizationGraphQL {
  repositories: {
    nodes: RepositoryGithub[];
  }
}
