-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Competition');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "wallet_balance" MONEY NOT NULL,
    "total_holdings_value" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "athlete_limit" INTEGER,
    "money_limit" DECIMAL(65,30),
    "duration_in_days" INTEGER,

    CONSTRAINT "CompetitionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" SERIAL NOT NULL,
    "competition_type_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "user_result" VARCHAR(1) NOT NULL,
    "user_one_id" INTEGER NOT NULL,
    "user_two_id" INTEGER NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Athlete" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "position" VARCHAR(5) NOT NULL,
    "origin" VARCHAR(50) NOT NULL,
    "team_abbr" VARCHAR(50) NOT NULL,
    "image_url" VARCHAR(200) NOT NULL,
    "point_average" DECIMAL(65,30),
    "rebound_average" DECIMAL(65,30),
    "assist_average" DECIMAL(65,30),
    "block_average" DECIMAL(65,30),
    "steal_average" DECIMAL(65,30),
    "turnover_average" DECIMAL(65,30),
    "last_updated" VARCHAR(50) NOT NULL,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holding" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "share_amt" DOUBLE PRECISION NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockPrice" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" MONEY NOT NULL,
    "athlete_id" INTEGER NOT NULL,

    CONSTRAINT "StockPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AthleteCompetition" (
    "athlete_id" INTEGER NOT NULL,
    "competition_id" INTEGER NOT NULL,

    CONSTRAINT "AthleteCompetition_pkey" PRIMARY KEY ("athlete_id","competition_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "recipient_id" INTEGER NOT NULL,
    "date_sent" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "key" VARCHAR(30) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_competition_type_id_key" ON "Competition"("competition_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_user_one_id_key" ON "Competition"("user_one_id");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_user_two_id_key" ON "Competition"("user_two_id");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_user_id_key" ON "Holding"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_athlete_id_key" ON "Holding"("athlete_id");

-- CreateIndex
CREATE UNIQUE INDEX "StockPrice_athlete_id_key" ON "StockPrice"("athlete_id");

-- CreateIndex
CREATE UNIQUE INDEX "AthleteCompetition_athlete_id_key" ON "AthleteCompetition"("athlete_id");

-- CreateIndex
CREATE UNIQUE INDEX "AthleteCompetition_competition_id_key" ON "AthleteCompetition"("competition_id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_sender_id_key" ON "Notification"("sender_id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_recipient_id_key" ON "Notification"("recipient_id");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_competition_type_id_fkey" FOREIGN KEY ("competition_type_id") REFERENCES "CompetitionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_user_one_id_fkey" FOREIGN KEY ("user_one_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_user_two_id_fkey" FOREIGN KEY ("user_two_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPrice" ADD CONSTRAINT "StockPrice_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteCompetition" ADD CONSTRAINT "AthleteCompetition_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteCompetition" ADD CONSTRAINT "AthleteCompetition_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
