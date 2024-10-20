import { ObjectId, Document } from 'mongoose'

export interface IFeature {
  _id: ObjectId
  name: string
  description?: string
  tasksId?: ObjectId[]
  authorId?: ObjectId
  url?: string
}

export interface IFeatureDocument extends IFeature, Document<ObjectId> {}
