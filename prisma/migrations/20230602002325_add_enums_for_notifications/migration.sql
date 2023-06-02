/*
  Warnings:

  - Changed the type of `status` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('pending');

-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'FriendRequest';

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "status",
ADD COLUMN     "status" "NotificationStatus" NOT NULL;
