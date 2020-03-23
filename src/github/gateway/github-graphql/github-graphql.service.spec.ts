import { Test, TestingModule } from '@nestjs/testing';
import { GithubGraphqlService } from './github-graphql.service';

describe('GithubGraphqlService', () => {
  let service: GithubGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubGraphqlService],
    }).compile();

    service = module.get<GithubGraphqlService>(GithubGraphqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
