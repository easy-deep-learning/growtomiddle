enum ApplicationStatus {
  DRAFT = 'draft',
  APPLIED = 'applied',
  HR_SCREEN = 'hr_screen',
  TECH_INTERVIEW = 'tech_interview',
  TASK = 'task',
  FINAL = 'final',
  OFFER = 'offer',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

type Application = {
  id: string;
  vacancyId: string;
  companyId?: string;
  title: string; // usually same as vacancy title
  applicationDate: string;
  channel: 'email' | 'portal' | 'referral' | 'linkedin' | 'other';
  status: ApplicationStatus;
  cvVersion?: string; // which CV you used
  coverLetter?: string;
  contactPerson?: string; // recruiter name
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
