"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: { id: true, industryInsight: true },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error("Erro in auth check");
    throw error;
  }
};
