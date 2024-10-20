import { ObjectId, Document } from 'mongoose'
import { IUser } from './User'
import { IFeature } from './Feature'

export interface IProject {
  _id: ObjectId
  authorId: ObjectId
  name: string
  description?: string
  featuresId?: ObjectId[]
  url?: string
}

export interface IProjectAuthorPopulated extends IProject {
  author: IUser
  features: IFeature[]
}

export interface IProjectDocument extends IProject, Document<ObjectId> {}
