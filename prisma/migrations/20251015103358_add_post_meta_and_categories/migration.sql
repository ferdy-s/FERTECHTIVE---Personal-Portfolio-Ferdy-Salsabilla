-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaKeywords" TEXT[],
ADD COLUMN     "metaTitle" TEXT;
