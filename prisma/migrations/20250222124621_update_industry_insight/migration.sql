/*
  Warnings:

  - The `topSkills` column on the `IndustryInsight` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `keyTrends` column on the `IndustryInsight` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "topSkills",
ADD COLUMN     "topSkills" TEXT[],
DROP COLUMN "keyTrends",
ADD COLUMN     "keyTrends" TEXT[];
