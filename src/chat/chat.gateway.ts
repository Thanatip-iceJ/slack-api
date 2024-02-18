import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageDto } from './Dto/messageDto.dto';
import { ChatroomsService } from 'src/chatrooms/chatrooms.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer() server: Server;
  constructor(private chatroomsService: ChatroomsService) {}
  //
  //
  @SubscribeMessage('createMessage')
  async handleMessage(@MessageBody() obj: MessageDto): Promise<void> {
    console.log('GatewaymMssage =>', obj);
    const { message, userId, channelId, chatroom } = obj;
    console.log(chatroom);
    const res = await this.chatroomsService.createChannelMessage(
      message,
      userId,
      +channelId,
    );
    this.server.to(chatroom).emit('returnMessage', res);
  }
  //
  //
  @SubscribeMessage('findAllMessages')
  async findAll(@MessageBody() payload) {
    console.log('PAYLOAD =>', payload);
    const res = await this.chatroomsService.findAllChannelMsg(payload);
    this.server.to(payload.room).emit('findAllMessages', res);
  }
  //
  //
  @SubscribeMessage('joinRoom')
  join(
    @MessageBody() roomObj: { room: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.in(client.id).socketsJoin(roomObj.room);
    this.server.to(roomObj.room).emit('joinResponse', { room: roomObj.room });
  }
}
