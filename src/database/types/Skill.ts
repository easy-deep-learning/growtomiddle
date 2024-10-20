import { Document, ObjectId } from 'mongoose'

export interface ISkill {
  _id: ObjectId
  name: string
  description?: string
}

export interface ISkillDocument extends ISkill, Document<ObjectId> {}
