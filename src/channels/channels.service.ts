import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}
  async createChannel(req) {
    const { userId } = req.user;
    const { roomId } = req.params;
    try {
      // Check if user is admin
      const isAdmin = await this.prisma.chatroomMember.findFirst({
        where: { userId: +userId, id: +roomId, isAdmin: true },
      });
      if (!isAdmin) {
        throw new UnauthorizedException(
          "You're not an admin of this workspace.",
        );
      }
      //
      const channel = await this.prisma.channel.create({
        data: { name: req.body.name, chatroomId: +roomId },
      });
      // Create CH member
      await this.prisma.channelMember.create({
        data: { channelId: channel.id, userId: +userId },
      });

      const res = await this.prisma.chatroom.findFirst({
        where: { Channels: { some: { id: channel.id } } },
        include: { Channels: { where: { id: channel.id } } },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return `This action returns all channels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
