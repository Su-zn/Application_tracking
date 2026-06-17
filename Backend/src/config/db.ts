import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function DbConnection(){
    try {
        await prisma.$connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database", error);
        throw error;
        process.exit(1);
    }
}