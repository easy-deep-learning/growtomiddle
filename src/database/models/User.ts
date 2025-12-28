// Users are creating by next-auth.js

import mongoose, { Document, Schema } from 'mongoose';

import Role from './Role';

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  role: Schema.Types.ObjectId;
}

export type UserDocument = Omit<User, '_id'> & Document;

const UserSchema = new Schema<UserDocument>({
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
});

const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
