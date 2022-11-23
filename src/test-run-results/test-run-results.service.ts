import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestRunResultDto } from './dto/create-test-run-result.dto';
import { UpdateTestRunResultDto } from './dto/update-test-run-result.dto';
import {
  TestRunResult,
  TestRunResultDocument,
} from './entities/test-run-result.entity';

@Injectable()
export class TestRunResultsService {
  constructor(
    @InjectModel(TestRunResult.name)
    private testRunResultModel: Model<TestRunResultDocument>,
  ) {}

  create(
    createTestRunResultDto: CreateTestRunResultDto,
  ): Promise<TestRunResult> {
    const testRunResult = new this.testRunResultModel(createTestRunResultDto);
    return testRunResult.save();
  }

  findAll(): Promise<TestRunResult[]> {
    return this.testRunResultModel.find().exec();
  }

  findById(id: string): Promise<TestRunResult> {
    return this.testRunResultModel.findById(id).exec();
  }

  update(
    id: string,
    updateTestRunResultDto: UpdateTestRunResultDto,
  ): Promise<TestRunResult> {
    return this.testRunResultModel
      .findByIdAndUpdate(id, updateTestRunResultDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.testRunResultModel.findByIdAndDelete(id).exec();
  }
}
