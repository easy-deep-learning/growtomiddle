import mongoose, { Schema } from 'mongoose'

import {
  Action,
  ResourceName,
  Permission,
  IRoleDocument,
} from '@/database/types/Role'

const defaultOwnerPermissions: Permission[] = [
  {
    actions: [Action.create, Action.read, Action.update, Action.delete],
    resource: ResourceName._own,
  },
]

const RoleSchema = new Schema<IRoleDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      _id: false,
      type: [
        {
          _id: false,
          actions: {
            type: [String],
            enum: Object.values(Action),
          },
          resource: {
            type: String,
            enum: Object.values(ResourceName),
          },
        },
      ],
      default: defaultOwnerPermissions,
      set: (permissions: Permission[]) => {
        return permissions.length === 0 ? defaultOwnerPermissions : permissions
      },
    },
  },
  {
    timestamps: true,
  }
)

const RoleModel: mongoose.Model<IRoleDocument> =
  mongoose.models.Role || mongoose.model<IRoleDocument>('Role', RoleSchema)

export default RoleModel
