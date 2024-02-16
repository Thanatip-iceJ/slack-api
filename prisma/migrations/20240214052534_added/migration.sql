-- DropForeignKey
ALTER TABLE `ChannelMember` DROP FOREIGN KEY `ChannelMember_channelId_fkey`;

-- DropForeignKey
ALTER TABLE `ChatroomMember` DROP FOREIGN KEY `ChatroomMember_chatroomId_fkey`;

-- AddForeignKey
ALTER TABLE `ChatroomMember` ADD CONSTRAINT `ChatroomMember_chatroomId_fkey` FOREIGN KEY (`chatroomId`) REFERENCES `Chatroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChannelMember` ADD CONSTRAINT `ChannelMember_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
