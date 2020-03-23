import { Module } from '@nestjs/common';
import { RepositoryController } from './controller/repository/repository.controller';
import { RepositoryService } from './service/repository/repository.service';
import { GithubService } from './gateway/github/github.service';
import { GithubApiService } from './gateway/github-api/github-api.service';
import { GithubGraphqlService } from './gateway/github-graphql/github-graphql.service';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService, GithubService, GithubApiService, GithubGraphqlService]
})
export class GithubModule {}
