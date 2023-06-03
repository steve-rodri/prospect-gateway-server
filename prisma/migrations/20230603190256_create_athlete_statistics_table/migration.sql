/*
  Warnings:

  - You are about to drop the column `assistAverage` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `blockAverage` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `pointAverage` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `reboundAverage` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `stealAverage` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `turnoverAverage` on the `Athlete` table. All the data in the column will be lost.
  - You are about to alter the column `teamAbbr` on the `Athlete` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(5)`.
  - Added the required column `draftPick` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "assistAverage",
DROP COLUMN "blockAverage",
DROP COLUMN "origin",
DROP COLUMN "pointAverage",
DROP COLUMN "reboundAverage",
DROP COLUMN "stealAverage",
DROP COLUMN "turnoverAverage",
ADD COLUMN     "draftPick" TEXT NOT NULL,
ALTER COLUMN "photoUri" SET DATA TYPE TEXT,
ALTER COLUMN "teamAbbr" SET DATA TYPE VARCHAR(5);

-- CreateTable
CREATE TABLE "AthleteStatistics" (
    "athleteId" INTEGER NOT NULL,
    "pointAverage" DECIMAL(65,30),
    "reboundAverage" DECIMAL(65,30),
    "assistAverage" DECIMAL(65,30),
    "blockAverage" DECIMAL(65,30),
    "stealAverage" DECIMAL(65,30),
    "turnoverAverage" DECIMAL(65,30)
);

-- CreateIndex
CREATE UNIQUE INDEX "AthleteStatistics_athleteId_key" ON "AthleteStatistics"("athleteId");

-- AddForeignKey
ALTER TABLE "AthleteStatistics" ADD CONSTRAINT "AthleteStatistics_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
