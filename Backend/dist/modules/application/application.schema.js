import { z } from "zod";
export const createApplicationSchema = z.object({
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    jobTitle: z.string().min(1),
    jobType: z.enum(["INTERNSHIP", "FULL_TIME", "PART_TIME"]),
    status: z.enum([
        "APPLIED",
        "INTERVIEWING",
        "OFFER",
        "REJECTED",
    ]),
    appliedDate: z.string().min(1, "Applied date is required").optional(),
    notes: z.string().optional(),
});
export const updateApplicationSchema = z.object({
    companyName: z.string().min(2).optional(),
    jobTitle: z.string().optional(),
    jobType: z.enum(["INTERNSHIP", "FULL_TIME", "PART_TIME"]).optional(),
    status: z.enum([
        "APPLIED",
        "INTERVIEWING",
        "OFFER",
        "REJECTED",
    ]).optional(),
    appliedDate: z.string().datetime().optional(),
    notes: z.string().optional(),
});
export const idParamSchema = z.object({
    id: z.string().uuid(),
});
export const searchSchema = z.object({
    q: z.string().min(1, "Search query cannot be empty"),
});
export const statusFilterSchema = z.object({
    status: z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED"]),
});
//# sourceMappingURL=application.schema.js.map