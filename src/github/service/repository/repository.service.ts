import { Injectable } from '@nestjs/common';
import { GithubService } from 'src/github/gateway/github/github.gateway.service';
import { RepositoryRepositoryService } from 'src/github/repositories/repository/repository.repository.service';

@Injectable()
export class RepositoryService {
  constructor(
    private readonly githubService: GithubService,
    private readonly repositoryReporitoryService: RepositoryRepositoryService,
  ) {}

  public async scan() {
    const organization = await this.githubService.scanOrganization();
    const repository = organization.repositories.nodes[0];

    this.repositoryReporitoryService.create(repository);

    return organization;
  }
}
