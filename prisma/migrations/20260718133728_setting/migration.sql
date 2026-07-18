/*
  Warnings:

  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_userId_fkey";

-- DropTable
DROP TABLE "Settings";

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "showGoogleAnalytics" BOOLEAN NOT NULL DEFAULT false,
    "themePreference" TEXT NOT NULL DEFAULT 'dark',
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "siteTitle" TEXT,
    "siteDescription" TEXT,
    "defaultOgImage" TEXT,
    "contactEmail" TEXT,
    "resumeUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
