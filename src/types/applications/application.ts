export interface Application {
  id: number;
  user_id: number;
  title: string;
  company_name: string;
  company_location: string;
  apply_status: string;
  approval_status: string;
  application_category: string;
  notes?: string;
  deadline: string;
  work_location: string;
  submitted_status: string;
  application_link?: string;
  poster_link?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ApplicationSummary {
  total_applications: number;
  total_not_submitted: number;
  total_accepted: number;
}
