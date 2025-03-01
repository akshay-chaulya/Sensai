import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: This global variable ensures that the prisma client instance is
// reused across hot reloads during development. Without this, each thime your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
