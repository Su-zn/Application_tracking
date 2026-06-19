import { prisma } from '../../config/db.js';
export async function createApplication(data) {
    return prisma.application.create({
        data: {
            companyName: data.companyName,
            jobTitle: data.jobTitle,
            jobType: data.jobType,
            status: data.status,
            appliedDate: data.appliedDate ?? new Date(),
            notes: data.notes,
        }
    });
}
export async function getApplications() {
    return prisma.application.findMany({
        orderBy: {
            appliedDate: 'desc'
        }
    });
}
export async function getApplicationById(id) {
    return await prisma.application.findUnique({
        where: {
            id: id.id
        }
    });
}
export async function updateApplication(id, data) {
    return await prisma.application.update({
        where: {
            id: id.id,
        },
        data: {
            companyName: data.companyName,
            jobTitle: data.jobTitle,
            jobType: data.jobType,
            status: data.status,
            appliedDate: data.appliedDate,
            notes: data.notes,
        }
    });
}
export async function deleteApplication(id) {
    return prisma.application.delete({
        where: {
            id: id.id
        }
    });
}
export async function searchApplications(query) {
    return prisma.application.findMany({
        where: {
            OR: [
                { companyName: { contains: query.q, mode: 'insensitive' } },
                { jobTitle: { contains: query.q, mode: 'insensitive' } },
            ]
        }
    });
}
export async function filterApplicationsByStatus(status) {
    return prisma.application.findMany({
        where: {
            status: status.status
        },
        orderBy: {
            appliedDate: 'desc'
        }
    });
}
//# sourceMappingURL=application.service.js.map