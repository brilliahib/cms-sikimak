import z from "zod";

export const applicationsSchema = z.object({
  title: z.string().min(2).max(100),
  company_name: z.string().max(500),
  company_location: z.string().max(500),
  apply_status: z.string().max(100),
  approval_status: z.string().max(100),
  application_category: z.string().max(100),
  work_location: z.string().max(100),
  notes: z.string().max(500).nullable().optional(),
  deadline: z.string(),
});

export type ApplicationsType = z.infer<typeof applicationsSchema>;
