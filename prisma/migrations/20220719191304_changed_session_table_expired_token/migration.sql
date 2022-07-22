/*
  Warnings:

  - You are about to drop the column `loggedOut` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "loggedOut",
ADD COLUMN     "expiredToken" BOOLEAN NOT NULL DEFAULT false;
