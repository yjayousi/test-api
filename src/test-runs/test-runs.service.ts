import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionsService } from 'src/questions/questions.service';
import { TestRunResultsService } from 'src/test-run-results/test-run-results.service';
import { CreateTestRunDto } from './dto/create-test-run.dto';
import { UpdateTestRunDto } from './dto/update-test-run.dto';
import { TestRun, TestRunDocument } from './entities/test-run.entity';

@Injectable()
export class TestRunsService {
  private readonly logger = new Logger(TestRunsService.name);
  constructor(
    @InjectModel(TestRun.name) private testRunModel: Model<TestRunDocument>,
    private readonly questionsService: QuestionsService,
    private readonly testRunResultsService: TestRunResultsService,
  ) {}

  async create(createTestRunDto: CreateTestRunDto) {
    let testRun = new this.testRunModel(createTestRunDto);
    testRun = await testRun.save();
    this.runQueries(testRun);
    return testRun;
  }

  findAll() {
    return this.testRunModel.find().exec();
  }

  findLast() {
    return this.testRunModel.findOne().sort({ created_at: -1 }).exec();
  }

  findById(id: string) {
    return this.testRunModel.findById(id).exec();
  }

  update(id: string, updateTestRunDto: UpdateTestRunDto) {
    return this.testRunModel
      .findByIdAndUpdate(id, updateTestRunDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.testRunModel.findByIdAndDelete(id).exec();
  }

  private async runQueries(testRun: TestRun) {
    const questions = await this.questionsService.findAll();

    // Run queries in parallel
    const chunk_size = 5;
    while (questions.length > 0) {
      const chunk = questions.splice(0, chunk_size);
      await Promise.all(
        chunk.map(
          (q) =>
            new Promise(async (resolve, reject) => {
              try {
                const result = await this.testRunResultsService.create({
                  artifact_id: testRun.artifact_id,
                  test_run_id: testRun._id,
                  question_id: q._id,
                  question: q.text,
                });
                resolve(result);
              } catch (error) {
                this.logger.error(`query failed for question ${q._id}`);
                resolve(null);
              }
            }),
        ),
      );
    }
  }
}
