import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../../common/BaseModel';

export type TestRunDocument = HydratedDocument<TestRun>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'test-runs',
})
export class TestRun extends BaseModel {
  @Prop()
  artifact_id: string;
}

export const TestRunSchema = SchemaFactory.createForClass(TestRun);
