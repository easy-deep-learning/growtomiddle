import mongoose, { Schema } from 'mongoose'

import {
  Action,
  Resource,
  Permission,
  IRoleDocument,
} from '@/database/types/Role'

const defaultOwnerPermissions: Permission[] = [
  {
    actions: [Action.create, Action.read, Action.update, Action.delete],
    resource: Resource._own,
  },
]

const RoleSchema = new Schema<IRoleDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [
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
    default: defaultOwnerPermissions,
    set: (permissions: Permission[]) => {
      return permissions.length === 0 ? defaultOwnerPermissions : permissions
    },
  },
})

const RoleModel: mongoose.Model<IRoleDocument> =
  mongoose.models.Role || mongoose.model<IRoleDocument>('Role', RoleSchema)

export default RoleModel
