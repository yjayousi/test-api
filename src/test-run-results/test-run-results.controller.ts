import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTestRunResultDto } from './dto/create-test-run-result.dto';
import { UpdateTestRunResultDto } from './dto/update-test-run-result.dto';
import { TestRunResultsService } from './test-run-results.service';

@Controller('test-run-results')
export class TestRunResultsController {
  constructor(private readonly testRunResultsService: TestRunResultsService) {}

  @Post()
  create(@Body() createTestRunResultDto: CreateTestRunResultDto) {
    return this.testRunResultsService.create(createTestRunResultDto);
  }

  @Get()
  findAll() {
    return this.testRunResultsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.testRunResultsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestRunResultDto: UpdateTestRunResultDto,
  ) {
    return this.testRunResultsService.update(id, updateTestRunResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testRunResultsService.remove(id);
  }
}
