/*
  Warnings:

  - Changed the type of `demandLevel` on the `IndustryInsight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `marketOutlook` on the `IndustryInsight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_industry_fkey";

-- AlterTable
ALTER TABLE "CoverLetter" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "demandLevel",
ADD COLUMN     "demandLevel" TEXT NOT NULL,
DROP COLUMN "marketOutlook",
ADD COLUMN     "marketOutlook" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DemandLevel";

-- DropEnum
DROP TYPE "MarketOutlook";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_industry_fkey" FOREIGN KEY ("industry") REFERENCES "IndustryInsight"("industry") ON DELETE SET NULL ON UPDATE CASCADE;
