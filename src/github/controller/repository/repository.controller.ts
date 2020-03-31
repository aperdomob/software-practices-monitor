import { Controller, Get, Post, Query, Param } from '@nestjs/common';
import { RepositoryService } from 'src/github/service/repository/repository.service';
import { Repository } from 'src/github/interfaces/domain.interfaces';

@Controller('repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  public getAllRepositories() {
    return this.repositoryService.getAllRepositories();
  }

  @Get(':repositoryName')
  public getRepositoryDetail(@Param() params) {
    return this.repositoryService.getRepositoryConfidence(
      params.repositoryName,
    );
  }
}
