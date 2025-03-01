"use server";

import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";
import { checkAuth } from "@/lib/checkAuth";

export async function updateUser(data) {
  try {
    const user = await checkAuth();

    const result = await db.$transaction(
      async (tx) => {
        // find if the industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // if industry doesn't exist, create it with default values - will replace it with ai later
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, //default: 5000
      }
    );

    return { success: true, ...result };
  } catch (error) {
    console.log("Error updating user and industry: ", error.message);
    throw new Error("Faild to update profile");
  }
}

export async function getUserOnboardingStatus() {
  try {
    const user = await checkAuth();

    return {
      isOnboarded: !!user?.industryInsight,
    };
  } catch (error) {
    console.log("Error checking onboarding status: ", error.message);
    throw new Error("Failed to check onboarding status");
  }
}
