/*
  Warnings:

  - You are about to drop the column `totalHoldingsValue` on the `User` table. All the data in the column will be lost.
  - Changed the type of `icp` on the `AthleteStock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AthleteStockICP" AS ENUM ('RolePlayer', 'AllStar', 'Starter', 'Generational', 'Superstar', 'Star');

-- AlterTable
ALTER TABLE "AthleteStock" DROP COLUMN "icp",
ADD COLUMN     "icp" "AthleteStockICP" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "totalHoldingsValue";
