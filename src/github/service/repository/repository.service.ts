import { Injectable } from '@nestjs/common';
import { GithubGateway } from 'src/github/gateway/github/github.gateway';
import { RepositoryRepository } from 'src/github/repositories/repository/repository.repository';

@Injectable()
export class RepositoryService {
  constructor(
    private readonly githubService: GithubGateway,
    private readonly repositoryReporitoryService: RepositoryRepository,
  ) {}
}
