import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ChatroomsModule } from './chatrooms/chatrooms.module';
import { ChannelsModule } from './channels/channels.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { ChatroomsService } from './chatrooms/chatrooms.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AuthModule,
    CloudinaryModule,
    ChatroomsModule,
    ChannelsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ChatGateway,
    ChatService,
    ChatroomsService,
    PrismaService,
  ],
})
export class AppModule {}
