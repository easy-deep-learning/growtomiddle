import mongoose, { Schema, Document, ObjectId } from 'mongoose'
import type { ITask } from '@/database/types/Task'
import TaskModel from '@/database/models/Task'
import { IFeatureDocument } from '../types/Feature'
import UserModel from './User'

const FeatureSchema = new Schema<IFeatureDocument>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: TaskModel,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    tasksId: [
      {
        type: Schema.Types.ObjectId,
        ref: TaskModel,
      },
    ],
    url: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

FeatureSchema.virtual<ITask>('tasks', {
  ref: TaskModel,
  localField: 'tasksId',
  foreignField: '_id',
  justOne: false,
})

FeatureSchema.virtual<ITask>('author', {
  ref: UserModel,
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
})

const FeatureModel: mongoose.Model<IFeatureDocument> =
  mongoose.models.Feature ||
  mongoose.model<IFeatureDocument>('Feature', FeatureSchema)

export default FeatureModel
