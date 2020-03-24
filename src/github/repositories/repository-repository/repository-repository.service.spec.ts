import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryRepositoryService } from './repository-repository.service';

describe('RepositoryRepositoryService', () => {
  let service: RepositoryRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoryRepositoryService],
    }).compile();

    service = module.get<RepositoryRepositoryService>(RepositoryRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
