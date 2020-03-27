import { Module } from '@nestjs/common';
import { RepositoryController } from './controller/repository/repository.controller';
import { RepositoryService } from './service/repository/repository.service';
import { GithubGateway } from './gateway/github/github.gateway';
import { GithubApiGateway } from './gateway/github-api/github-api.gateway';
import { GithubGraphqlService } from './gateway/github-graphql/github-graphql.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryRepository } from './repositories/repository/repository.repository';
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
    GithubApiGateway,
    GithubGraphqlService,
    RepositoryRepository,
    OrganizationMapper,
    OrganizationService,
  ],
})
export class GithubModule {}
