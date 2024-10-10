import mongoose, { Schema, Document } from 'mongoose'

export enum Permission {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

export interface IRole {
  _id: string
  name: string
  permissions: Permission[]
}

export interface IRoleDocument extends Omit<IRole, '_id'>, Document {}

const RoleSchema = new Schema<IRoleDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    required: true,
    enum: Object.values(Permission),
  },
})

const RoleModel: mongoose.Model<IRoleDocument> =
  mongoose.models.Role || mongoose.model<IRoleDocument>('Role', RoleSchema)

export default RoleModel
