import { Controller, Get, UseGuards, Req, Delete } from '@nestjs/common';
import { ChatroomsService } from './chatrooms.service';
// import { CreateChatroomDto } from './dto/create-chatroom.dto';
// import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('chatrooms')
export class ChatroomsController {
  constructor(private readonly chatroomsService: ChatroomsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAuthRooms(@Req() req: Request) {
    return this.chatroomsService.getAllRooms(req);
  }

  // @UseGuards(AuthGuard)
  // @SubscribeMessage('createMessage')
  // @Post(':channelId')
  // async createGroupMessage() {
  //   return this.chatroomsService.createChannelMessage();
  // }

  @UseGuards(AuthGuard)
  @Get('messages/:channelId')
  async getChannelMessages(@Req() req) {
    return this.chatroomsService.findAllChannelMsg(req);
  }

  @UseGuards(AuthGuard)
  @Delete('messages/:channelId')
  async clearChatHistory(@Req() req) {
    const { channelId } = req.params;
    console.log(channelId);
    return this.chatroomsService.clearHistory(+channelId);
  }
}
