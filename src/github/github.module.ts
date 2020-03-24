import { Module } from '@nestjs/common';
import { RepositoryController } from './controller/repository/repository.controller';
import { RepositoryService } from './service/repository/repository.service';
import { GithubService } from './gateway/github/github.gateway.service';
import { GithubApiService } from './gateway/github-api/github-api.gateway.service';
import { GithubGraphqlService } from './gateway/github-graphql/github-graphql.gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryRepositoryService } from './repositories/repository/repository.repository.service';
import { RepositorySchema } from './repositories/schemas/repository.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Repository', schema: RepositorySchema },
    ]),
  ],
  controllers: [RepositoryController],
  providers: [
    RepositoryService,
    GithubService,
    GithubApiService,
    GithubGraphqlService,
    RepositoryRepositoryService,
  ],
})
export class GithubModule {}
