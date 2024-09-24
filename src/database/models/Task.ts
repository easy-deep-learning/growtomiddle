/**
 * @example
 *  {
 *  "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *  "name": "Create a form for an interview",
 *  "description": "Create a form for an interview",
 *  "skills": [],
 *  "url": "https://github.com/you/your-repo/issues/1",
 *  }
 */

import mongoose, { Schema, Document } from 'mongoose'
import type { ISkill } from '@/database/models/Skill'
import SkillModel from '@/database/models/Skill'

export interface ITask {
  _id: string
  name: string
  description: string
  skills: ISkill[]
  url: string
}

export interface ITaskDocument extends Omit<ITask, '_id'>, Document {}

const TaskSchema = new Schema<ITaskDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: SkillModel,
      },
    ],
    url: String,
  },
  {
    timestamps: true,
  }
)

const TaskModel: mongoose.Model<ITaskDocument> =
  mongoose.models.Task || mongoose.model<ITaskDocument>('Task', TaskSchema)

export default TaskModel
