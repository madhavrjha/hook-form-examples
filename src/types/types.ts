import { z } from "zod";

export const GradeSchema = z.record(z.record(z.string().array()));
export type GradeSchema = z.infer<typeof GradeSchema>;
