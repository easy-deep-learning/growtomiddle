/**
 * @example
 *  {
 *  "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *  "name": "My interviews tracker",
 *  "description": "My interviews tracker: a job position, questions, wins and fails etc",
 *  "features": [],
 *  "url": "https://github.com/you/your-repo/",
 *  }
 */

import mongoose, { Document, Schema } from 'mongoose';

import { IFeature } from '@/database/models/Feature';

export interface IProject {
  _id: string;
  name: string;
  description: string;
  features: IFeature[]; // TODO: use virtuals?
  url: string;
}

export interface IProjectDocument extends Omit<IProject, '_id'>, Document {}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feature',
      },
    ],
    url: String,
  },
  {
    timestamps: true,
  }
);

const ProjectModel: mongoose.Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);

export default ProjectModel;
