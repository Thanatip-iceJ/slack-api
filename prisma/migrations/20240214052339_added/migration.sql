/*
  Warnings:

  - Added the required column `channelId` to the `ChannelMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChannelMember` ADD COLUMN `channelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ChannelMember` ADD CONSTRAINT `ChannelMember_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
