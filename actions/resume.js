"use server";

import { checkAuth } from "@/lib/checkAuth";
import { model } from "@/lib/geminiAI/model";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveResume(content) {
  try {
    const user = await checkAuth();

    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume: ", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  try {
    const user = await checkAuth();

    return await db.resume.findUnique({
      where: {
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error geting resume: ", error);
    throw new Error("Failed to get resume");
  }
}

export async function improveWithAI({ current, type }) {
  try {
    const user = await checkAuth();

    const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

    const result = await model.generateContent(prompt);
    const improveContent = result.response.text().trim();

    return improveContent;
  } catch (error) {
    console.error("Error improve with AI: ", error);
    throw new Error("Failed to improve with AI");
  }
}
