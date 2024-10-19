// Users are creating by next-auth.js

import mongoose, { Schema } from 'mongoose'

import Role from './Role'
import type { IUserDocument } from '../types/User'

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
