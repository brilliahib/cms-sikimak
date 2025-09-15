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
  deadline: Date;
  created_at: Date;
  updated_at: Date;
}
