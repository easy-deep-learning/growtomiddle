import mongoose, { Schema, Document } from 'mongoose'

import { Action, Resource, IRole } from '@/database/types/Role'

export interface IRoleDocument extends Omit<IRole, '_id'>, Document {}

const RoleSchema = new Schema<IRoleDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      actions: {
        type: [String],
        enum: Object.values(Action),
      },
      resource: {
        type: String,
        enum: Object.values(Resource),
      },
    },
  ],
})

const RoleModel: mongoose.Model<IRoleDocument> =
  mongoose.models.Role || mongoose.model<IRoleDocument>('Role', RoleSchema)

export default RoleModel
