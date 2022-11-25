import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenBookClient } from 'src/openbook/OpenBookClient';
import { CreateTestRunResultDto } from './dto/create-test-run-result.dto';
import { UpdateTestRunResultDto } from './dto/update-test-run-result.dto';
import {
  TestRunResult,
  TestRunResultDocument,
} from './entities/test-run-result.entity';

@Injectable()
export class TestRunResultsService {
  private readonly logger = new Logger(TestRunResultsService.name);
  constructor(
    @InjectModel(TestRunResult.name)
    private testRunResultModel: Model<TestRunResultDocument>,
    private openBookClient: OpenBookClient,
  ) {}

  async create(createTestRunResultDto: CreateTestRunResultDto) {
    // invoke queryArtifact endpoint
    const answer = await this.openBookClient.queryArtifact({
      query: createTestRunResultDto.question,
      artifact_id: createTestRunResultDto.artifact_id,
    });

    // find previous result for the same question
    let previousResult;
    if (createTestRunResultDto.previous_test_run_id) {
      previousResult = await this.testRunResultModel
        .findOne({
          test_run_id: createTestRunResultDto.previous_test_run_id,
          question_id: createTestRunResultDto.question_id,
        })
        .exec();
    }

    // if answer not changed, copy previous score
    const answer_score =
      previousResult?.answer === answer
        ? previousResult.answer_score
        : undefined;

    const testRunResult = new this.testRunResultModel({
      ...createTestRunResultDto,
      answer,
      answer_score,
      previous_test_run_id: createTestRunResultDto.previous_test_run_id,
    });

    return testRunResult.save();
  }

  findByTestRun(testRunId: string) {
    return this.testRunResultModel.find({ test_run_id: testRunId }).exec();
  }

  findById(id: string) {
    return this.testRunResultModel.findById(id).exec();
  }

  update(id: string, updateTestRunResultDto: UpdateTestRunResultDto) {
    return this.testRunResultModel
      .findByIdAndUpdate(id, updateTestRunResultDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.testRunResultModel.findByIdAndDelete(id).exec();
  }
}
