/*
  Warnings:

  - You are about to drop the column `published` on the `Project` table. All the data in the column will be lost.
  - The `images` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "published",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT,
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];
