import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenbookModule } from 'src/openbook/openbook.module';
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
    OpenbookModule,
  ],
  controllers: [TestRunResultsController],
  providers: [TestRunResultsService],
  exports: [TestRunResultsService],
})
export class TestRunResultsModule {}
