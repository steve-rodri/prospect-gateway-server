-- DropForeignKey
ALTER TABLE "StockPrice" DROP CONSTRAINT "StockPrice_athleteId_fkey";

-- DropIndex
DROP INDEX "AthleteCompetition_athleteId_key";

-- DropIndex
DROP INDEX "AthleteCompetition_competitionId_key";

-- DropIndex
DROP INDEX "Competition_competitionTypeId_key";

-- DropIndex
DROP INDEX "Competition_userOneId_key";

-- DropIndex
DROP INDEX "Competition_userTwoId_key";

-- DropIndex
DROP INDEX "Holding_athleteId_key";

-- DropIndex
DROP INDEX "Holding_userId_key";

-- DropIndex
DROP INDEX "Notification_recipientId_key";

-- DropIndex
DROP INDEX "Notification_senderId_key";

-- DropIndex
DROP INDEX "StockPrice_athleteId_key";

-- CreateTable
CREATE TABLE "AthleteStock" (
    "athleteId" INTEGER NOT NULL,
    "ipo" DECIMAL(65,30) NOT NULL,
    "icp" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AthleteStock_athleteId_key" ON "AthleteStock"("athleteId");

-- AddForeignKey
ALTER TABLE "AthleteStock" ADD CONSTRAINT "AthleteStock_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPrice" ADD CONSTRAINT "StockPrice_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "AthleteStock"("athleteId") ON DELETE RESTRICT ON UPDATE CASCADE;
