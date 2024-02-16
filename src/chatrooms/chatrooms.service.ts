import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ChannelMessage } from '@prisma/client';
// import { CreateChatroomDto } from './dto/create-chatroom.dto';
// import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateChatMsgDto } from './dto/create-chatroom.dto';

@Injectable()
export class ChatroomsService {
  constructor(private prisma: PrismaService) {}

  async initNewUser(user) {
    const room = await this.prisma.chatroom.create({
      data: { name: `${user.username}'s workspace` },
    });
    await this.prisma.chatroomMember.create({
      data: {
        userId: user.id,
        isAdmin: true,
        chatroomId: room.id,
      },
    });
    const channel = await this.prisma.channel.create({
      data: { name: 'general', chatroomId: room.id },
    });
    await this.prisma.channelMember.create({
      data: { userId: user.id, channelId: channel.id },
    });
  }

  // async findRoomIds(userId) {
  //   const roomIds = await this.prisma.channelMember
  // }

  async getAllRooms(userId) {
    if (userId.user) {
      userId = userId.user.id;
    }
    const rooms = await this.prisma.chatroom.findMany({
      where: {
        ChatroomMember: {
          some: {
            userId: userId,
          },
        },
      },
      include: { Channels: true },
    });
    return rooms;
  }

  async getAuthRooms(req) {
    const { userId } = req.user;
    const rooms = await this.prisma.chatroom.findMany({
      include: { ChatroomMember: userId },
    });
    const channels = await this.prisma.channel.findMany({
      include: { ChannelMember: userId },
    });
    return { rooms, channels };
  }
  async createChannelMessage(
    message: string,
    userId: number,
    channelId: number,
  ): Promise<CreateChatMsgDto> {
    console.log('create');
    const res = await this.prisma.channelMessage.create({
      data: { message: message, sendById: userId, channelId: channelId },
      include: { user: true },
    });
    return res;
  }
  catch(err) {
    console.log(err);
  }

  async findAllChannelMsg({
    userId,
    channelId,
  }: {
    userId: number;
    channelId: number;
  }): Promise<ChannelMessage[]> {
    try {
      // const foundChannel = await this.prisma.channel.findFirst({
      //   where: {
      //     id: +channelId,
      //   },
      //   include: {
      //     ChannelMember: true,
      //   },
      // });
      // const isMember = foundChannel.ChannelMember.find(
      //   (el) => el.userId === +userId,
      // );
      // if (!isMember) {
      //   throw new UnauthorizedException("You're not a member of this channel.");
      // }
      console.log(channelId);
      const res = await this.prisma.channelMessage.findMany({
        where: {
          channelId: +channelId,
        },
        include: { user: true },
        take: 20,
        orderBy: {
          createdAt: 'asc',
        },
      });
      // console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} chatroom`;
  // }

  // update(id: number, updateChatroomDto: UpdateChatroomDto) {
  //   return `This action updates a #${id} chatroom`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chatroom`;
  // }
}
