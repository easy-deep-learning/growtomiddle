import { ObjectId, Document } from 'mongoose'
import { IRole } from './Role'

export interface IUser {
  _id: ObjectId
  name: string
  email: string
  image: string
  emailVerified: boolean
  role: IRole
}

export interface IUserDocument extends IUser, Document<ObjectId> {}
