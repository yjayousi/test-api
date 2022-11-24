import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from 'src/questions/questions.module';
import { TestRunResultsModule } from 'src/test-run-results/test-run-results.module';
import { TestRun, TestRunSchema } from './entities/test-run.entity';
import { TestRunsController } from './test-runs.controller';
import { TestRunsService } from './test-runs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TestRun.name, schema: TestRunSchema }]),
    QuestionsModule,
    TestRunResultsModule,
  ],
  controllers: [TestRunsController],
  providers: [TestRunsService],
})
export class TestRunsModule {}
