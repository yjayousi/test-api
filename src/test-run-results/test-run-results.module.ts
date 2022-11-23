import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TestRunResult,
  TestRunResultSchema,
} from './entities/test-run-result.entity';
import { TestRunResultsController } from './test-run-results.controller';
import { TestRunResultsService } from './test-run-results.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TestRunResult.name, schema: TestRunResultSchema },
    ]),
  ],
  controllers: [TestRunResultsController],
  providers: [TestRunResultsService],
})
export class TestRunResultsModule {}
