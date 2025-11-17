enum InterviewType {
  HR_SCREEN = 'hr_screen',
  TECH = 'tech',
  SYSTEM_DESIGN = 'system_design',
  LIVE_CODING = 'live_coding',
  MANAGER = 'manager',
  TEAM = 'team',
  FINAL = 'final',
  OTHER = 'other',
}

type Interview = {
  id: string;
  applicationId: string;
  type: InterviewType;
  title?: string; // e.g. "Tech interview with Team Lead"
  scheduledAt: string; // datetime
  durationMinutes?: number;
  timeZone?: string;
  locationType: 'online' | 'onsite' | 'hybrid';
  locationDetails?: string; // Zoom link, office address, etc.
  interviewerNames?: string[];
  preparationNotes?: string;
  feedback?: string; // after interview
  status: 'planned' | 'done' | 'cancelled' | 'rescheduled';
  createdAt: string;
  updatedAt: string;
};
