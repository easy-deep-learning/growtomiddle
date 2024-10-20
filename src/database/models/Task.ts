import mongoose, { Schema } from 'mongoose'

import SkillModel from '@/database/models/Skill'
import { ITaskDocument } from '../types/Task'
import { ISkill } from '../types/Skill'

const TaskSchema = new Schema<ITaskDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    skillsId: [
      {
        type: Schema.Types.ObjectId,
        ref: SkillModel,
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

TaskSchema.virtual<ISkill>('skills', {
  ref: SkillModel,
  localField: 'skillsId',
  foreignField: '_id',
})

const TaskModel: mongoose.Model<ITaskDocument> =
  mongoose.models.Task || mongoose.model<ITaskDocument>('Task', TaskSchema)

export default TaskModel
