import { Test, TestingModule } from '@nestjs/testing';
import { TestRunResultsService } from './test-run-results.service';

describe('TestRunResultsService', () => {
  let service: TestRunResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestRunResultsService],
    }).compile();

    service = module.get<TestRunResultsService>(TestRunResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
