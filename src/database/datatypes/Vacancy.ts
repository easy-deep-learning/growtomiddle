export type Vacancy = {
  id: string;
  companyId?: string; // relation to Company
  title: string;
  size: "small" | "medium" | "large";
  type: "startup" | "enterprise" | "government" | "non-profit" | "other";
  source: "linkedin" | "xing" | "indeed" | "referral" | "other";
  sourceUrl?: string;
  location?: string;
  employmentType?: "full-time" | "part-time" | "contract" | "internship";
  level?: "junior" | "middle" | "senior" | "lead";
  techStack?: string[]; // e.g. ['Next.js', 'Node.js', 'TS']
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
};
