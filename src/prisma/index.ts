import { PrismaClient } from "../../prisma/generated/client/client";

declare global{
    var prisma: PrismaClient | undefined;
};

export const prismaclient = globalThis.prisma || new PrismaClient();


if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaclient
export default prismaclient;