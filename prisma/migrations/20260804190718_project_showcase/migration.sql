-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "category" TEXT,
ADD COLUMN     "challenges" TEXT[],
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "features" JSONB,
ADD COLUMN     "fullDescription" TEXT,
ADD COLUMN     "metrics" JSONB,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'Production',
ADD COLUMN     "techCategories" JSONB;
