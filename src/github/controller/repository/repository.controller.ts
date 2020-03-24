import { Controller, Get } from '@nestjs/common';
import { RepositoryService } from 'src/github/service/repository/repository.service';

@Controller('repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  public getAllRepositories() {
    return this.repositoryService.scan();
  }
}
