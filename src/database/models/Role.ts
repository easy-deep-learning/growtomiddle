import mongoose, { Schema, Document } from 'mongoose'

export enum Permission {
  CREATE = 'create',
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
}

export enum RoleName {
  ADMIN = 'admin',
  MANAGER = 'manager',
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
    enum: Object.values(RoleName),
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    enum: Object.values(Permission),
    required: true,
  },
})

const RoleModel: mongoose.Model<IRoleDocument> =
  mongoose.models.Role || mongoose.model<IRoleDocument>('Role', RoleSchema)

export default RoleModel
