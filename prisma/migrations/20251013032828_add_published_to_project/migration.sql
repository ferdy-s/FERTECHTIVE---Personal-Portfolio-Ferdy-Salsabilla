/*
  Warnings:

  - Changed the type of `tags` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `images` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB NOT NULL,
DROP COLUMN "images",
ADD COLUMN     "images" JSONB NOT NULL;
