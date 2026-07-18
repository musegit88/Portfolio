/*
  Warnings:

  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_userId_fkey";

-- DropTable
DROP TABLE "settings";

-- CreateTable
CREATE TABLE "Settings" (
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

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
