import { ObjectId, Document } from 'mongoose'

export interface ITask {
  _id: ObjectId
  name: string
  description?: string
  skillsId?: ObjectId[]
  url?: string
}

export interface ITaskDocument extends ITask, Document<ObjectId> {}
