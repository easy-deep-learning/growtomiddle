import { ObjectId, Document } from 'mongoose'
import { IUser } from './User'

export interface IProject {
  _id: ObjectId
  authorId: ObjectId
  name: string
  description?: string
  features?: ObjectId[]
  url?: string
}

export interface IProjectAuthorPopulated extends IProject {
  author: IUser
}

export interface IProjectDocument extends IProject, Document<ObjectId> {}
