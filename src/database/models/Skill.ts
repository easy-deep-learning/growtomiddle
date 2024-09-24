import mongoose, { Schema, Document } from 'mongoose'

/**
 * @example
 *
 * {
 *  "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *  "name": "HTML Forms",
 *  "description": "Collect data from user and send it to server",
 *  "materials": [],
 *  }
 */

export interface ISkill {
  _id: string
  name: string
  description: string
}

export interface ISkillDocument extends Omit<ISkill, '_id'>, Document {}

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
