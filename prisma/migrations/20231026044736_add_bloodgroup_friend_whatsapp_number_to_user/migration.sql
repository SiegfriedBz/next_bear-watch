-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bloodGroup" "BloodGroup" DEFAULT 'O_POSITIVE',
ADD COLUMN     "friendWhatsappNumber" TEXT;
