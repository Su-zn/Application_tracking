import { Prisma } from "../../generated/prisma/client.js";
import { createApplication, getApplications, getApplicationById, updateApplication, deleteApplication, searchApplications, filterApplicationsByStatus } from "./application.service.js";
import { updateApplicationSchema, idParamSchema, searchSchema, statusFilterSchema } from "./application.schema.js";
export async function createApplicationController(req, res, next) {
    try {
        const applicationResult = await createApplication(req.body);
        res.status(201).json({ data: applicationResult, message: "Application created successfully" });
    }
    catch (error) {
        next(error);
    }
}
export async function getAllApplicationsController(req, res, next) {
    try {
        const applicationResult = await getApplications();
        res.status(200).json({ data: applicationResult, message: "Applications fetched successfully" });
    }
    catch (error) {
        next(error);
    }
}
export async function getApplicationByIdController(req, res, next) {
    try {
        const id = idParamSchema.parse(req.params);
        const applicationResult = await getApplicationById(id);
        if (!applicationResult) {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        res.status(200).json({ message: "Application fetched successfully", data: applicationResult });
    }
    catch (error) {
        next(error);
    }
}
export async function updateApplicationController(req, res, next) {
    try {
        const id = idParamSchema.parse(req.params);
        const body = updateApplicationSchema.parse(req.body);
        const applicationResult = await updateApplication(id, body);
        res.status(200).json({ message: "Application updated successfully", data: applicationResult });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        next(error);
    }
}
export async function deleteApplicationController(req, res, next) {
    try {
        const id = idParamSchema.parse(req.params);
        const resultApplication = await deleteApplication(id);
        res.status(200).json({ message: "Application deleted successfully", data: resultApplication });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        next(error);
    }
}
export async function searchApplicationController(req, res, next) {
    try {
        const { q } = searchSchema.parse(req.query);
        const result = await searchApplications({ q });
        res.status(200).json({ message: "Search completed successfully", data: result });
    }
    catch (error) {
        next(error);
    }
}
export async function filterApplicationsByStatusController(req, res, next) {
    try {
        const { status } = statusFilterSchema.parse(req.query);
        const result = await filterApplicationsByStatus({ status });
        res.status(200).json({ message: "Filtering completed successfully", data: result });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=application.controller.js.map