-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enableGoogleAnalytics" BOOLEAN NOT NULL DEFAULT false,
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
