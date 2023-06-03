/*
  Warnings:

  - You are about to drop the column `assist_average` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `block_average` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `point_average` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `rebound_average` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `steal_average` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `team_abbr` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `turnover_average` on the `Athlete` table. All the data in the column will be lost.
  - The primary key for the `AthleteCompetition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `athlete_id` on the `AthleteCompetition` table. All the data in the column will be lost.
  - You are about to drop the column `competition_id` on the `AthleteCompetition` table. All the data in the column will be lost.
  - You are about to drop the column `competition_type_id` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `user_one_id` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `user_result` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `user_two_id` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `athlete_limit` on the `CompetitionType` table. All the data in the column will be lost.
  - You are about to drop the column `duration_in_days` on the `CompetitionType` table. All the data in the column will be lost.
  - You are about to drop the column `money_limit` on the `CompetitionType` table. All the data in the column will be lost.
  - You are about to drop the column `athlete_id` on the `Holding` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_date` on the `Holding` table. All the data in the column will be lost.
  - You are about to drop the column `share_amt` on the `Holding` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Holding` table. All the data in the column will be lost.
  - You are about to drop the column `date_sent` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `recipient_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `athlete_id` on the `StockPrice` table. All the data in the column will be lost.
  - You are about to drop the column `total_holdings_value` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_balance` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[athleteId]` on the table `AthleteCompetition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[competitionId]` on the table `AthleteCompetition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[competitionTypeId]` on the table `Competition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userOneId]` on the table `Competition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userTwoId]` on the table `Competition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[athleteId]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[senderId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipientId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[athleteId]` on the table `StockPrice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photoUri` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamAbbr` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `athleteId` to the `AthleteCompetition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `competitionId` to the `AthleteCompetition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `competitionTypeId` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userOneId` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userResult` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTwoId` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `athleteId` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseDate` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shareAmt` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `athleteId` to the `StockPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletBalance` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AthleteCompetition" DROP CONSTRAINT "AthleteCompetition_athlete_id_fkey";

-- DropForeignKey
ALTER TABLE "AthleteCompetition" DROP CONSTRAINT "AthleteCompetition_competition_id_fkey";

-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_competition_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_user_one_id_fkey";

-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_user_two_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_athlete_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "StockPrice" DROP CONSTRAINT "StockPrice_athlete_id_fkey";

-- DropIndex
DROP INDEX "AthleteCompetition_athlete_id_key";

-- DropIndex
DROP INDEX "AthleteCompetition_competition_id_key";

-- DropIndex
DROP INDEX "Competition_competition_type_id_key";

-- DropIndex
DROP INDEX "Competition_user_one_id_key";

-- DropIndex
DROP INDEX "Competition_user_two_id_key";

-- DropIndex
DROP INDEX "Holding_athlete_id_key";

-- DropIndex
DROP INDEX "Holding_user_id_key";

-- DropIndex
DROP INDEX "Notification_recipient_id_key";

-- DropIndex
DROP INDEX "Notification_sender_id_key";

-- DropIndex
DROP INDEX "StockPrice_athlete_id_key";

-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "assist_average",
DROP COLUMN "block_average",
DROP COLUMN "image_url",
DROP COLUMN "point_average",
DROP COLUMN "rebound_average",
DROP COLUMN "steal_average",
DROP COLUMN "team_abbr",
DROP COLUMN "turnover_average",
ADD COLUMN     "assistAverage" DECIMAL(65,30),
ADD COLUMN     "blockAverage" DECIMAL(65,30),
ADD COLUMN     "photoUri" VARCHAR(200) NOT NULL,
ADD COLUMN     "pointAverage" DECIMAL(65,30),
ADD COLUMN     "reboundAverage" DECIMAL(65,30),
ADD COLUMN     "stealAverage" DECIMAL(65,30),
ADD COLUMN     "teamAbbr" VARCHAR(50) NOT NULL,
ADD COLUMN     "turnoverAverage" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "AthleteCompetition" DROP CONSTRAINT "AthleteCompetition_pkey",
DROP COLUMN "athlete_id",
DROP COLUMN "competition_id",
ADD COLUMN     "athleteId" INTEGER NOT NULL,
ADD COLUMN     "competitionId" INTEGER NOT NULL,
ADD CONSTRAINT "AthleteCompetition_pkey" PRIMARY KEY ("athleteId", "competitionId");

-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "competition_type_id",
DROP COLUMN "end_time",
DROP COLUMN "start_time",
DROP COLUMN "user_one_id",
DROP COLUMN "user_result",
DROP COLUMN "user_two_id",
ADD COLUMN     "competitionTypeId" INTEGER NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userOneId" INTEGER NOT NULL,
ADD COLUMN     "userResult" VARCHAR(1) NOT NULL,
ADD COLUMN     "userTwoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CompetitionType" DROP COLUMN "athlete_limit",
DROP COLUMN "duration_in_days",
DROP COLUMN "money_limit",
ADD COLUMN     "athleteLimit" INTEGER,
ADD COLUMN     "durationInDays" INTEGER,
ADD COLUMN     "moneyLimit" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Holding" DROP COLUMN "athlete_id",
DROP COLUMN "purchase_date",
DROP COLUMN "share_amt",
DROP COLUMN "user_id",
ADD COLUMN     "athleteId" INTEGER NOT NULL,
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "shareAmt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "date_sent",
DROP COLUMN "recipient_id",
DROP COLUMN "sender_id",
ADD COLUMN     "dateSent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "recipientId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StockPrice" DROP COLUMN "athlete_id",
ADD COLUMN     "athleteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "total_holdings_value",
DROP COLUMN "wallet_balance",
ADD COLUMN     "totalHoldingsValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "walletBalance" MONEY NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AthleteCompetition_athleteId_key" ON "AthleteCompetition"("athleteId");

-- CreateIndex
CREATE UNIQUE INDEX "AthleteCompetition_competitionId_key" ON "AthleteCompetition"("competitionId");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_competitionTypeId_key" ON "Competition"("competitionTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_userOneId_key" ON "Competition"("userOneId");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_userTwoId_key" ON "Competition"("userTwoId");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_userId_key" ON "Holding"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_athleteId_key" ON "Holding"("athleteId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_senderId_key" ON "Notification"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_recipientId_key" ON "Notification"("recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "StockPrice_athleteId_key" ON "StockPrice"("athleteId");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_competitionTypeId_fkey" FOREIGN KEY ("competitionTypeId") REFERENCES "CompetitionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteCompetition" ADD CONSTRAINT "AthleteCompetition_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteCompetition" ADD CONSTRAINT "AthleteCompetition_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPrice" ADD CONSTRAINT "StockPrice_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
