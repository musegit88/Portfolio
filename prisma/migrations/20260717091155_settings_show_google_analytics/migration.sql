/*
  Warnings:

  - You are about to drop the column `enableGoogleAnalytics` on the `settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "settings" DROP COLUMN "enableGoogleAnalytics",
ADD COLUMN     "showGoogleAnalytics" BOOLEAN NOT NULL DEFAULT false;
