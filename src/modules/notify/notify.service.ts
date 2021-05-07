import { Injectable } from '@nestjs/common';
import { RequestService } from '../network/request.service';
import { generateChatRoomCard } from './googleChatHelper';


@Injectable()
export class NotifyService  {

  constructor(
    private readonly requestService: RequestService,
  ) { }

  async publish(data) {
    await this.notifyGoogleChatRoom(data)
  }

  async notifyGoogleChatRoom(data) {
    if (!process.env.GOOGLE_CHAT_ROOM_HOOK) return
    const generatedChatRoomCard = generateChatRoomCard(data)
    await this.requestService.post(process.env.GOOGLE_CHAT_ROOM_HOOK, generatedChatRoomCard);
  }


}
