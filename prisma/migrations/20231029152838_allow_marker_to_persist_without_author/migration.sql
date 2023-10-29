-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_userId_fkey";

-- AlterTable
ALTER TABLE "Marker" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
