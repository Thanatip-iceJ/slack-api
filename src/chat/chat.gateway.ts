import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageDto } from './Dto/messageDto.dto';
import { ChatroomsService } from 'src/chatrooms/chatrooms.service';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer() server;
  constructor(private chatroomsService: ChatroomsService) {}
  //
  @SubscribeMessage('createMessage')
  async handleMessage(@MessageBody() obj: MessageDto): Promise<void> {
    console.log('GatewaymMssage =>', obj);
    const { message, userId, channelId } = obj;
    const res = await this.chatroomsService.createChannelMessage(
      message,
      userId,
      +channelId,
    );
    this.server.emit('returnMessage', res);
  }

  @SubscribeMessage('findAllMessages')
  async findAll(@MessageBody() payload) {
    console.log('PAYLOAD =>', payload);
    const res = await this.chatroomsService.findAllChannelMsg(payload);
    // console.log(res);
    this.server.emit('findAllMessages', res);
  }
}
