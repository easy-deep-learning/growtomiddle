import { ObjectId, Document } from 'mongoose'

export interface IFeature {
  _id: ObjectId
  name: string
  description?: string
  tasksId?: ObjectId[]
  url?: string
}

export interface IFeatureDocument extends Document<ObjectId, {}, IFeature> {}
