import mongoose, { HydratedDocument, InferSchemaType, Model, Schema } from 'mongoose';

export enum VacancySize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum VacancyType {
  STARTUP = 'startup',
  ENTERPRISE = 'enterprise',
  GOVERNMENT = 'government',
  NON_PROFIT = 'non-profit',
  OTHER = 'other',
}

export enum VacancySource {
  LINKEDIN = 'linkedin',
  XING = 'xing',
  INDEED = 'indeed',
  REFERRAL = 'referral',
  OTHER = 'other',
}

export enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
}

export enum VacancyLevel {
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  LEAD = 'lead',
}

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}

const VacancySchema = new Schema(
  {
    companyId: { type: String, required: false },
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: Object.values(VacancySize),
    },
    type: {
      type: String,
      enum: Object.values(VacancyType),
    },
    source: {
      type: String,
      enum: Object.values(VacancySource),
    },
    sourceUrl: String,
    location: String,
    employmentType: {
      type: String,
      enum: Object.values(EmploymentType),
    },
    level: {
      type: String,
      enum: Object.values(VacancyLevel),
    },
    techStack: [String],
    salaryRange: {
      from: Number,
      to: Number,
      currency: {
        type: String,
        enum: Object.values(Currency),
      },
      gross: Boolean,
    },
    descriptionSnippet: String,
    notes: String,
    isSaved: {
      type: Boolean,
      default: false,
    },
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
export type VacancyDocument = HydratedDocument<Vacancy>;

// 3. The Model
// "as Model<VacancyDocument>" is crucial for Next.js hot-reloading to type the cached model correctly.
const VacancyModel =
  (mongoose.models.Vacancy as Model<VacancyDocument>) ||
  mongoose.model<VacancyDocument>('Vacancy', VacancySchema);

export default VacancyModel;
