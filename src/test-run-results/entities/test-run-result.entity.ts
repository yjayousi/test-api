import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/BaseModel';

export type TestRunResultDocument = HydratedDocument<TestRunResult>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'test-run-results',
})
export class TestRunResult extends BaseModel {
  @Prop()
  artifact_id: string;

  @Prop()
  test_run_id: string;

  @Prop()
  question_id: string;

  @Prop()
  question: string;

  @Prop()
  answer: string;

  @Prop()
  answer_score: number;

  @Prop()
  previous_test_run_id: string;
}

export const TestRunResultSchema = SchemaFactory.createForClass(TestRunResult);
