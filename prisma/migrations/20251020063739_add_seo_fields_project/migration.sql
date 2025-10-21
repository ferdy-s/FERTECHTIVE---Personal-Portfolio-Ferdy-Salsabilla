-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "canonicalUrl" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Project_published_updatedAt_idx" ON "Project"("published", "updatedAt");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "Project"("slug");
