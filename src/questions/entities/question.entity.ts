import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from 'src/common/BaseModel';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Question extends BaseModel {
  @Prop()
  text: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
