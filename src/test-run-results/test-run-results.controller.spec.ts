import { Test, TestingModule } from '@nestjs/testing';
import { TestRunResultsController } from './test-run-results.controller';
import { TestRunResultsService } from './test-run-results.service';

describe('TestRunResultsController', () => {
  let controller: TestRunResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestRunResultsController],
      providers: [TestRunResultsService],
    }).compile();

    controller = module.get<TestRunResultsController>(TestRunResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
