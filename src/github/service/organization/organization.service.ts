import { Injectable } from '@nestjs/common';
import { GithubGateway } from 'src/github/gateway/github/github.gateway';
import { RepositoryRepository } from 'src/github/repositories/repository/repository.repository';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly githubGateway: GithubGateway,
    private readonly repositoryRepository: RepositoryRepository) {}

  public async scanner() {
    const organization = await this.githubGateway.scanOrganization();

    this.repositoryRepository.deleteAll();
    this.repositoryRepository.saveAll(organization.repositories);

    return organization;
  }
}
