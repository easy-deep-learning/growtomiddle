import mongoose, { Document, Schema } from 'mongoose';

export interface IHrQuestion {
  _id: string;
  // TODO: Add your fields here
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IHrQuestionDocument
  extends Omit<IHrQuestion, '_id' | 'createdAt' | 'updatedAt'>, Document {
  createdAt: Date;
  updatedAt: Date;
}

const HrQuestionSchema = new Schema<IHrQuestionDocument>(
  {
    // TODO: Add your schema fields here
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HrQuestionModel: mongoose.Model<IHrQuestionDocument> =
  mongoose.models.HrQuestion || mongoose.model<IHrQuestionDocument>('HrQuestion', HrQuestionSchema);

export default HrQuestionModel;

