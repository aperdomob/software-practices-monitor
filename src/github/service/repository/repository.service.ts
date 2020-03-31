import { Injectable } from '@nestjs/common';
import { GithubGateway } from 'src/github/gateway/github/github.gateway';
import { RepositoryRepository } from 'src/github/repositories/repository/repository.repository';
import { Repository } from 'src/github/interfaces/domain.interfaces';
import { EngineService } from 'src/rule-engine/service/engine/engine.service';
import { GithubRules } from 'src/github/rules/github.rules';

@Injectable()
export class RepositoryService {
  constructor(
    private readonly githubService: GithubGateway,
    private readonly repositoryReporitory: RepositoryRepository,
    private readonly engineService: EngineService,
  ) {}

  async getAllRepositories() {
    const repositories = (await this.repositoryReporitory.getAll()) as Repository[];

    const rulesResult = repositories.map(repo => {
      const result = this.engineService.run<Repository>(GithubRules, repo);

      return {
        name: repo.name,
        metrics: result.metrics,
      };
    });

    return rulesResult;
  }

  async getRepositoryConfidence(repository: string): Promise<any> {
    const repo = await this.repositoryReporitory.get({ name: repository });
    const result = this.engineService.run<Repository>(GithubRules, repo);

    return {
      name: repo.name,
      metrics: result.metrics,
      rules: result.rules,
    };
  }
}
