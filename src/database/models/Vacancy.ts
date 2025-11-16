import mongoose, { Schema, Document } from "mongoose";

export interface IVacancy {
  _id: string;
  companyId?: string;
  title: string;
  size: "small" | "medium" | "large";
  type: "startup" | "enterprise" | "government" | "non-profit" | "other";
  source: "linkedin" | "xing" | "indeed" | "referral" | "other";
  sourceUrl?: string;
  location?: string;
  employmentType?: "full-time" | "part-time" | "contract" | "internship";
  level?: "junior" | "middle" | "senior" | "lead";
  techStack?: string[];
  salaryRange?: {
    from?: number;
    to?: number;
    currency?: string;
    gross?: boolean;
  };
  descriptionSnippet?: string;
  notes?: string;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IVacancyDocument extends Omit<IVacancy, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const VacancySchema = new Schema<IVacancyDocument>(
  {
    companyId: String,
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
    },
    type: {
      type: String,
      enum: ["startup", "enterprise", "government", "non-profit", "other"],
      required: true,
    },
    source: {
      type: String,
      enum: ["linkedin", "xing", "indeed", "referral", "other"],
      required: true,
    },
    sourceUrl: String,
    location: String,
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    level: {
      type: String,
      enum: ["junior", "middle", "senior", "lead"],
    },
    techStack: [String],
    salaryRange: {
      from: Number,
      to: Number,
      currency: String,
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

const VacancyModel: mongoose.Model<IVacancyDocument> =
  mongoose.models.Vacancy || mongoose.model<IVacancyDocument>("Vacancy", VacancySchema);

export default VacancyModel;

