import mongoose, { Schema, Document } from 'mongoose'

export enum Permission {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

export interface IUserRole {
  _id: string
  name: string
  permissions: Permission[]
}

export interface IUserRoleDocument extends Omit<IUserRole, '_id'>, Document {}

const UserRoleSchema = new Schema<IUserRoleDocument>({
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

const UserRoleModel: mongoose.Model<IUserRoleDocument> =
  mongoose.models.UserRole ||
  mongoose.model<IUserRoleDocument>('UserRole', UserRoleSchema)

export default UserRoleModel
