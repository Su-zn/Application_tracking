import { z } from "zod";
export declare const createApplicationSchema: z.ZodObject<{
    companyName: z.ZodString;
    jobTitle: z.ZodString;
    jobType: z.ZodEnum<{
        INTERNSHIP: "INTERNSHIP";
        FULL_TIME: "FULL_TIME";
        PART_TIME: "PART_TIME";
    }>;
    status: z.ZodEnum<{
        APPLIED: "APPLIED";
        INTERVIEWING: "INTERVIEWING";
        OFFER: "OFFER";
        REJECTED: "REJECTED";
    }>;
    appliedDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateApplicationSchema: z.ZodObject<{
    companyName: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    jobType: z.ZodOptional<z.ZodEnum<{
        INTERNSHIP: "INTERNSHIP";
        FULL_TIME: "FULL_TIME";
        PART_TIME: "PART_TIME";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        APPLIED: "APPLIED";
        INTERVIEWING: "INTERVIEWING";
        OFFER: "OFFER";
        REJECTED: "REJECTED";
    }>>;
    appliedDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const searchSchema: z.ZodObject<{
    q: z.ZodString;
}, z.core.$strip>;
export declare const statusFilterSchema: z.ZodObject<{
    status: z.ZodEnum<{
        APPLIED: "APPLIED";
        INTERVIEWING: "INTERVIEWING";
        OFFER: "OFFER";
        REJECTED: "REJECTED";
    }>;
}, z.core.$strip>;
export type statusFilterDTO = z.infer<typeof statusFilterSchema>;
export type createApplicationDTO = z.infer<typeof createApplicationSchema>;
export type updateApplicationDTO = z.infer<typeof updateApplicationSchema>;
export type idParamDTO = z.infer<typeof idParamSchema>;
export type searchDTO = z.infer<typeof searchSchema>;
//# sourceMappingURL=application.schema.d.ts.map