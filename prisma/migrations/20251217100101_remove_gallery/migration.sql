/*
  Warnings:

  - You are about to drop the `PackageImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PackageImage" DROP CONSTRAINT "PackageImage_packageId_fkey";

-- DropTable
DROP TABLE "PackageImage";
