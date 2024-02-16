import { Module } from '@nestjs/common';
import { ChatroomsService } from './chatrooms.service';
import { ChatroomsController } from './chatrooms.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ChatroomsController],
  providers: [ChatroomsService, PrismaService],
})
export class ChatroomsModule {}
