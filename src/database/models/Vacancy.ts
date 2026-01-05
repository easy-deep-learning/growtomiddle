import mongoose, { HydratedDocument, InferSchemaType, Model, Schema } from 'mongoose';

const VacancySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sourceUrl: String,
    location: String,
    techStack: [String],
    salary: Number,
    descriptionSnippet: String,
  },
  {
    timestamps: true,
  }
);

// 1. The Pure Data Type (POJO)
// Use this in your frontend components (e.g. Props).
// It contains all schema fields + createdAt/updatedAt/id, but NO mongoose methods.
export type Vacancy = InferSchemaType<typeof VacancySchema>;

// 2. The Document Type
// Use this in backend logic when you fetch from DB.
// It includes .save(), .isModified(), etc.
export type VacancyDocument = HydratedDocument<Vacancy> & { id: string };

// 3. The Model
// "as Model<VacancyDocument>" is crucial for Next.js hot-reloading to type the cached model correctly.
const VacancyModel =
  (mongoose.models?.Vacancy as Model<VacancyDocument>) ||
  mongoose.model<VacancyDocument>('Vacancy', VacancySchema);

export default VacancyModel;
