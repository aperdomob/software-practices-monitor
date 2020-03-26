import { Module } from '@nestjs/common';
import { RepositoryController } from './controller/repository/repository.controller';
import { RepositoryService } from './service/repository/repository.service';
import { GithubGateway } from './gateway/github/github.gateway';
import { GithubApiService } from './gateway/github-api/github-api.gateway.service';
import { GithubGraphqlService } from './gateway/github-graphql/github-graphql.gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryRepositoryService } from './repositories/repository/repository.repository.service';
import { RepositorySchema } from './repositories/schemas/repository.schema';
import { OrganizationMapper } from './gateway/github/mapper/organization.mapper';
import { OrganizationController } from './controller/organization/organization.controller';
import { OrganizationService } from './service/organization/organization.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Repository', schema: RepositorySchema },
    ]),
  ],
  controllers: [RepositoryController, OrganizationController],
  providers: [
    RepositoryService,
    GithubGateway,
    GithubApiService,
    GithubGraphqlService,
    RepositoryRepositoryService,
    OrganizationMapper,
    OrganizationService,
  ],
})
export class GithubModule {}
