/**
 * @example
 *
 * {
 *  "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *  "name": "HTML Forms",
 *  "type": "article", // "video", "book", "course", "podcast", "article", "documentation", "example"
 *  "url": "https://developer.mozilla.org/en-US/docs/Learn/Forms",
 *  "description": "Collect data from user and send it to server",
 *  }
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IMaterial {
  _id: string;
  name: string;
  type: string;
  url: string;
  description: string;
}

export interface IMaterialDocument extends Omit<IMaterial, '_id'>, Document {}

const MaterialSchema = new Schema<IMaterialDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['article', 'video', 'book', 'course', 'podcast', 'documentation', 'example'],
      required: true,
    },
    url: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const MaterialModel: mongoose.Model<IMaterialDocument> =
  mongoose.models.Material || mongoose.model<IMaterialDocument>('Material', MaterialSchema);

export default MaterialModel;
