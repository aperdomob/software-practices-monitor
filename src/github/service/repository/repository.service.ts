import { Injectable } from '@nestjs/common';
import { GithubGateway } from 'src/github/gateway/github/github.gateway';
import { RepositoryRepositoryService } from 'src/github/repositories/repository/repository.repository.service';

@Injectable()
export class RepositoryService {
  constructor(
    private readonly githubService: GithubGateway,
    private readonly repositoryReporitoryService: RepositoryRepositoryService,
  ) {}
}
