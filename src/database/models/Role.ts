import mongoose, { Document, Schema } from 'mongoose';

import { Action, Resource } from '@/database/datatypes/Permission';
import type { Role } from '@/database/datatypes/Role';

export type RoleDocument = Document & Omit<Role, '_id' | 'createdAt' | 'updatedAt'>;

const RoleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const RoleModel: mongoose.Model<RoleDocument> =
  mongoose.models.Role || mongoose.model<RoleDocument>('Role', RoleSchema);

export default RoleModel;
