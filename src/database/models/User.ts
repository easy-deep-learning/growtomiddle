// Users are creating by next-auth.js

import mongoose, { Schema } from 'mongoose'

import RoleModel from './Role'
import type { IUserDocument } from '../types/User'

const UserSchema = new Schema<IUserDocument>(
  {
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
    roleId: {
      type: Schema.Types.ObjectId,
      ref: RoleModel,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

UserSchema.virtual('role', {
  ref: RoleModel,
  localField: 'roleId',
  foreignField: '_id',
  justOne: true,
})

const UserModel: mongoose.Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema)

export default UserModel
