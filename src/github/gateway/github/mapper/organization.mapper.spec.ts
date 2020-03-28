import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationMapper } from './organization.mapper';
import { TestData } from './organization.test';

describe('OrganizationMapper', () => {
  let mapper: OrganizationMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationMapper],
    }).compile();

    mapper = module.get<OrganizationMapper>(OrganizationMapper);
  });

  it('should be defined', () => {
    mapper.transform(TestData);
  });
});
