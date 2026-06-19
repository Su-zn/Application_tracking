import { createApplicationDTO, updateApplicationDTO, idParamDTO, searchDTO, statusFilterDTO } from "./application.schema.js";
export declare function createApplication(data: createApplicationDTO): Promise<{
    companyName: string;
    jobTitle: string;
    jobType: import("../../generated/prisma/enums.js").JobType;
    status: import("../../generated/prisma/enums.js").Status;
    appliedDate: Date;
    notes: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getApplications(): Promise<{
    companyName: string;
    jobTitle: string;
    jobType: import("../../generated/prisma/enums.js").JobType;
    status: import("../../generated/prisma/enums.js").Status;
    appliedDate: Date;
    notes: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getApplicationById(id: idParamDTO): Promise<{
    companyName: string;
    jobTitle: string;
    jobType: import("../../generated/prisma/enums.js").JobType;
    status: import("../../generated/prisma/enums.js").Status;
    appliedDate: Date;
    notes: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare function updateApplication(id: idParamDTO, data: updateApplicationDTO): Promise<{
    companyName: string;
    jobTitle: string;
    jobType: import("../../generated/prisma/enums.js").JobType;
    status: import("../../generated/prisma/enums.js").Status;
    appliedDate: Date;
    notes: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteApplication(id: idParamDTO): Promise<{
    companyName: string;
    jobTitle: string;
    jobType: import("../../generated/prisma/enums.js").JobType;
    status: import("../../generated/prisma/enums.js").Status;
    appliedDate: Date;
    notes: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function searchApplications(query: searchDTO): Promise<{
    companyName: string;
    jobTitle: string;
    jobType: import("../../generated/prisma/enums.js").JobType;
    status: import("../../generated/prisma/enums.js").Status;
    appliedDate: Date;
    notes: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function filterApplicationsByStatus(status: statusFilterDTO): Promise<{
    companyName: string;
    jobTitle: string;
    jobType: import("../../generated/prisma/enums.js").JobType;
    status: import("../../generated/prisma/enums.js").Status;
    appliedDate: Date;
    notes: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
//# sourceMappingURL=application.service.d.ts.map