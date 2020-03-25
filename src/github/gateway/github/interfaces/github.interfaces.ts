import { OrganizationGraphQL, RepositoryGraphQL } from "../../github-graphql/interfaces/graphql.interfaces";
import { RepositoryApi } from "../../github-api/interfaces/github-api.interfaces";

export interface Repository extends RepositoryGraphQL {
  additionalData: RepositoryApi;
}

export interface Organization extends OrganizationGraphQL {
  repositories: {
    nodes: Repository[];
  }
}
