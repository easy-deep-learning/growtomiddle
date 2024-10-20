import mongoose, { Schema, Document, ObjectId } from 'mongoose'
import UserModel from './User'
import FeatureModel from './Feature'
import { IProjectDocument } from '../types/Project'

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
    // features: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: FeatureModel,
    //   },
    // ],
    url: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ProjectSchema.virtual('author', {
  ref: UserModel,
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
})

const ProjectModel: mongoose.Model<IProjectDocument> =
  mongoose.models.Project ||
  mongoose.model<IProjectDocument>('Project', ProjectSchema)

export default ProjectModel
