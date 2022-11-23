import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestRunDto } from './dto/create-test-run.dto';
import { UpdateTestRunDto } from './dto/update-test-run.dto';
import { TestRun, TestRunDocument } from './entities/test-run.entity';

@Injectable()
export class TestRunsService {
  constructor(
    @InjectModel(TestRun.name) private testRunModel: Model<TestRunDocument>,
  ) {}

  create(createTestRunDto: CreateTestRunDto): Promise<TestRun> {
    const testRun = new this.testRunModel(createTestRunDto);
    return testRun.save();
  }

  findAll(): Promise<TestRun[]> {
    return this.testRunModel.find().exec();
  }

  findById(id: string): Promise<TestRun> {
    return this.testRunModel.findById(id).exec();
  }

  update(id: string, updateTestRunDto: UpdateTestRunDto): Promise<TestRun> {
    return this.testRunModel
      .findByIdAndUpdate(id, updateTestRunDto, { new: true })
      .exec();
  }

  remove(id: string): Promise<TestRun> {
    return this.testRunModel.findByIdAndDelete(id).exec();
  }
}
