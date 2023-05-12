/*
  Warnings:

  - You are about to drop the column `muId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MERCHANT', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "muId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
