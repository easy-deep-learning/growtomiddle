import mongoose, { Schema, Document, ObjectId } from 'mongoose'
import type { ITask } from '@/database/models/Task'
import TaskModel from '@/database/models/Task'

const FeatureSchema = new Schema<IFeatureDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: TaskModel,
      },
    ],
    url: String,
  },
  {
    timestamps: true,
  }
)

const FeatureModel: mongoose.Model<IFeatureDocument> =
  mongoose.models.Feature ||
  mongoose.model<IFeatureDocument>('Feature', FeatureSchema)

export default FeatureModel
