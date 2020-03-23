import { Controller, Get } from '@nestjs/common';
import { GithubService } from 'src/github/gateway/github/github.service';

@Controller('repositories')
export class RepositoryController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  public getAllRepositories() {
    return this.githubService.scanOrganization();
  }
}
