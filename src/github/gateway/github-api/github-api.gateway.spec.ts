import { Test, TestingModule } from '@nestjs/testing';
import { GithubApiGateway } from './github-api.gateway';

describe('GithubApiService', () => {
  let service: GithubApiGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubApiGateway],
    }).compile();

    service = module.get<GithubApiGateway>(GithubApiGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
