import mongoose, { Schema } from 'mongoose'

import { ISkillDocument } from '../types/Skill'

const SkillSchema = new Schema<ISkillDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
)

const SkillModel: mongoose.Model<ISkillDocument> =
  mongoose.models.Skill || mongoose.model<ISkillDocument>('Skill', SkillSchema)

export default SkillModel
