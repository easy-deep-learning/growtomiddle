import mongoose, { Schema, Document, ObjectId } from 'mongoose'
import UserModel from './User'
import FeatureModel from './Feature'
import { IProjectDocument } from '../types/Project'
import { IUserWithRole } from '../types/User'
import { IFeature } from '../types/Feature'

const ProjectSchema = new Schema<IProjectDocument>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    featuresId: [
      {
        type: Schema.Types.ObjectId,
        ref: FeatureModel,
      },
    ],
    url: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ProjectSchema.virtual<IUserWithRole>('author', {
  ref: UserModel,
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
})

ProjectSchema.virtual<IFeature>('features', {
  ref: FeatureModel,
  localField: 'featuresId',
  foreignField: '_id',
})

const ProjectModel: mongoose.Model<IProjectDocument> =
  mongoose.models.Project ||
  mongoose.model<IProjectDocument>('Project', ProjectSchema)

export default ProjectModel
