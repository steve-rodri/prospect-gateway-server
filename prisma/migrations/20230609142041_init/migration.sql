-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Competition', 'FriendRequest');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('rejected', 'pending', 'success');

-- CreateEnum
CREATE TYPE "AthleteStockICP" AS ENUM ('RolePlayer', 'AllStar', 'Starter', 'Generational', 'Superstar', 'Star');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "walletBalance" MONEY DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(40) NOT NULL,
    "athleteLimit" INTEGER,
    "moneyLimit" DECIMAL(65,30),
    "durationInDays" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "competitionTypeId" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Athlete" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "position" VARCHAR(5) NOT NULL,
    "photoUri" TEXT NOT NULL,
    "teamAbbr" VARCHAR(5) NOT NULL,
    "draftPick" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AthleteStatistics" (
    "athleteId" UUID NOT NULL,
    "pointAverage" DECIMAL(65,30),
    "reboundAverage" DECIMAL(65,30),
    "assistAverage" DECIMAL(65,30),
    "blockAverage" DECIMAL(65,30),
    "stealAverage" DECIMAL(65,30),
    "turnoverAverage" DECIMAL(65,30)
);

-- CreateTable
CREATE TABLE "AthleteStock" (
    "athleteId" UUID NOT NULL,
    "ipo" DECIMAL(65,30) NOT NULL,
    "icp" "AthleteStockICP" NOT NULL
);

-- CreateTable
CREATE TABLE "AthleteCompetition" (
    "userId" UUID NOT NULL,
    "athleteId" UUID NOT NULL,
    "competitionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AthleteCompetition_pkey" PRIMARY KEY ("userId","athleteId","competitionId")
);

-- CreateTable
CREATE TABLE "Holding" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "athleteId" UUID NOT NULL,
    "shareAmt" DOUBLE PRECISION NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockPrice" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "athleteId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "StockPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "NotificationType" NOT NULL,
    "senderId" UUID NOT NULL,
    "recipientId" UUID NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'pending',
    "dateSent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AthleteStatistics_athleteId_key" ON "AthleteStatistics"("athleteId");

-- CreateIndex
CREATE UNIQUE INDEX "AthleteStock_athleteId_key" ON "AthleteStock"("athleteId");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_competitionTypeId_fkey" FOREIGN KEY ("competitionTypeId") REFERENCES "CompetitionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteStatistics" ADD CONSTRAINT "AthleteStatistics_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteStock" ADD CONSTRAINT "AthleteStock_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteCompetition" ADD CONSTRAINT "AthleteCompetition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteCompetition" ADD CONSTRAINT "AthleteCompetition_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteCompetition" ADD CONSTRAINT "AthleteCompetition_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPrice" ADD CONSTRAINT "StockPrice_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "AthleteStock"("athleteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
