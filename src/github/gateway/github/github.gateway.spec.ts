import { Test, TestingModule } from '@nestjs/testing';
import { GithubGateway } from './github.gateway';

describe('GithubService', () => {
  let service: GithubGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubGateway],
    }).compile();

    service = module.get<GithubGateway>(GithubGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
