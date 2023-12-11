/**
 * @example
 *  {
 *  "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *  "name": "CRUD for interviews",
 *  "description": "As user I create, read, update and delete an interview",
 *  "tasks": [
 *    {
 *      "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *      "name": "Create a HTML form for an interview",
 *    },
 *    {
 *      "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *      "name": "Create a NextJS api route for an interview",
 *    },
 *    {
 *      "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *      "name": "Create a MongoDB model for an interview",
 *    },
 *    {
 *      "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *     "name": "Create a e2e test for an interview",
 *    }
 *  ],
 *  "url": "https://github.com/you/your-repo/issues/1",
 *  }
 */

import mongoose, { Schema, Document } from 'mongoose'
import type { ITask } from '@/database/models/Task'
import TaskModel from '@/database/models/Task'

export interface IFeature {
  _id: string;
  name: string;
  description: string;
  tasks: ITask[];
  url: string;
}

export interface IFeatureDocument extends Omit<IFeature, '_id'>, Document {}

const FeatureSchema = new Schema<IFeatureDocument>({
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
  },
)

const FeatureModel: mongoose.Model<IFeatureDocument> =
  mongoose.models.Feature || mongoose.model<IFeatureDocument>('Feature', FeatureSchema)

export default FeatureModel
