import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    const question = new this.questionModel(createQuestionDto);
    return question.save();
  }

  async findAll() {
    return this.questionModel.find().exec();
  }

  findById(id: string) {
    return this.questionModel.findById(id).exec();
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.questionModel
      .findByIdAndUpdate(id, updateQuestionDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.questionModel.findByIdAndDelete(id).exec();
  }
}
