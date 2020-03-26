import { Injectable } from '@nestjs/common';
import { GithubGateway } from 'src/github/gateway/github/github.gateway';
import { RepositoryRepositoryService } from 'src/github/repositories/repository/repository.repository.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly githubGateway: GithubGateway,
    private readonly repositoryRepository: RepositoryRepositoryService) {}

  public async scanner() {
    const organization = await this.githubGateway.scanOrganization();
    organization.repositories.map((repo => this.repositoryRepository.create(repo)));
  }
}
