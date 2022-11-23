import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestRun, TestRunSchema } from './entities/test-run.entity';
import { TestRunsController } from './test-runs.controller';
import { TestRunsService } from './test-runs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TestRun.name, schema: TestRunSchema }]),
  ],
  controllers: [TestRunsController],
  providers: [TestRunsService],
})
export class TestRunsModule {}
