// Users are creating by next-auth.js

import mongoose, { Schema, Document } from 'mongoose'

import Role from './Role'
import { IRole } from '../types/Role'

export interface IUser {
  _id: string
  name: string
  email: string
  image: string
  emailVerified: boolean
  role: IRole
}

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const UserSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: Role,
  },
})

const UserModel: mongoose.Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema)

export default UserModel
