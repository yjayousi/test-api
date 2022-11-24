import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTestRunDto } from './dto/create-test-run.dto';
import { UpdateTestRunDto } from './dto/update-test-run.dto';
import { TestRunsService } from './test-runs.service';

@Controller('test-runs')
export class TestRunsController {
  constructor(private readonly testRunsService: TestRunsService) {}

  @Post()
  create(@Body() createTestRunDto: CreateTestRunDto) {
    return this.testRunsService.create(createTestRunDto);
  }

  @Get()
  findAll() {
    return this.testRunsService.findAll();
  }

  @Get('/last')
  findLast() {
    return this.testRunsService.findLast();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.testRunsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestRunDto: UpdateTestRunDto) {
    return this.testRunsService.update(id, updateTestRunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testRunsService.remove(id);
  }
}
