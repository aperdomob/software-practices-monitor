import { Injectable } from '@nestjs/common';
import { GithubGateway } from 'src/github/gateway/github/github.gateway';
import { RepositoryRepository } from 'src/github/repositories/repository/repository.repository';
import { Repository } from 'src/github/interfaces/domain.interfaces';

@Injectable()
export class RepositoryService {
  constructor(
    private readonly githubService: GithubGateway,
    private readonly repositoryReporitory: RepositoryRepository,
  ) {}

  getAllRepositories() {
    return this.repositoryReporitory.getAll();
  }

  getRepositoryConfidence(repository: string): any {
    return this.repositoryReporitory.get({ name: repository });
  }
}
