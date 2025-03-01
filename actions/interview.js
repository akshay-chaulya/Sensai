"use server";

import { checkAuth } from "@/lib/checkAuth";
import { model } from "@/lib/geminiAI/model";
import { db } from "@/lib/prisma";

export async function generateQuiz() {
  try {
    const user = await checkAuth();

    const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
      user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
    }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz: ", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answer, score) {
  try {
    let improvementTip;
    const user = await checkAuth();

    const questionResults = questions.map((q, index) => ({
      question: q.question,
      answer: q.correctAnswer,
      userAnswer: answer[index],
      isCorrect: q.correctAnswer === answer[index],
      explanation: q.explanation,
    }));

    const wrongAnsers = questionResults.filter((q) => !q.isCorrect);

    if (wrongAnsers.length > 0) {
      const wrongQuestionsText = wrongAnsers
        .map(
          (q) =>
            `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
        )
        .join("\n\n");

      const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

      const result = await model.generateContent(improvementPrompt);
      improvementTip = result.response.text().trim();
    }

    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result: ", error);
    throw new Error("Faild to save quiz result");
  }
}

export async function getAssessments() {
  try {
    const user = await checkAuth();

    const assessment = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error fetching assessments: ", error);
    throw new Error("Failed to fetch assessments");
  }
}
