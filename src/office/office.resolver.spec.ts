import { Test, TestingModule } from '@nestjs/testing';
import { OfficeResolver } from './office.resolver';

describe('OfficeResolver', () => {
  let resolver: OfficeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficeResolver],
    }).compile();

    resolver = module.get<OfficeResolver>(OfficeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
