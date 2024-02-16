/*
  Warnings:

  - Added the required column `chatroomId` to the `ChatroomMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChatroomMember` ADD COLUMN `chatroomId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ChatroomMember` ADD CONSTRAINT `ChatroomMember_chatroomId_fkey` FOREIGN KEY (`chatroomId`) REFERENCES `Chatroom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
