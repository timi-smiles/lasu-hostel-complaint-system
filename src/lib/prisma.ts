// This file contains authentication-related functions
// and Prisma Client initialization.
import { PrismaClient } from "../generated/prisma";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Ensure we only have one instance in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}