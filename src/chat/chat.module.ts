import { Module } from '@nestjs/common';
import { ChatroomsService } from 'src/chatrooms/chatrooms.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ChatroomsService, PrismaService],
})
export class ChatModule {}
