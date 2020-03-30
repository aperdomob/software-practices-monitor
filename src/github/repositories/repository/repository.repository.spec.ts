import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryRepository } from './repository.repository';

describe('RepositoryRepositoryService', () => {
  let service: RepositoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoryRepository],
    }).compile();

    service = module.get<RepositoryRepository>(RepositoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
