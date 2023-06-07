/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "username",
ALTER COLUMN "walletBalance" DROP NOT NULL,
ALTER COLUMN "walletBalance" SET DEFAULT 0;
