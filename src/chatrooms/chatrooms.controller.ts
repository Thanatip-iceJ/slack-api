import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
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
  //   @Post()
  //   create(@Req() req) {
  //     return this.chatroomsService.create(req);
  //   }

  //   @Get()
  //   findAll() {
  //     return this.chatroomsService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.chatroomsService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() updateChatroomDto: UpdateChatroomDto,
  //   ) {
  //     return this.chatroomsService.update(+id, updateChatroomDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.chatroomsService.remove(+id);
  //   }
}
