import { Injectable, OnModuleInit } from '@nestjs/common';
import { GITHUB_RELEASES } from 'src/utils/paths';
import { CryptoProviders } from 'src/utils/providers';
import { RequestService } from '../network/request.service';
import { NotifyModel } from './dto/notify.model';
import { MessageFactory } from './message.factory';
import { ChannelProviders } from "src/utils/providers";
import { compareVersion } from './notify.helper';


@Injectable()
export class NotifyService implements OnModuleInit {
  messageFactory: MessageFactory;
  constructor(private readonly requestService: RequestService ) { }

  onModuleInit(){
    this.messageFactory = new MessageFactory();
  }
  async publish(data: [NotifyModel]) {
    const newerVersion = await this.checkLatestGithubVersion()
    newerVersion && data.unshift(newerVersion)
    await this.notifyGoogleChatRoom(data)
  }

  async checkLatestGithubVersion(): Promise<NotifyModel> {
    const publishedVersions = await this.requestService.get(GITHUB_RELEASES)
    return compareVersion(publishedVersions, process.env.npm_package_version)
  }

  async notifyGoogleChatRoom(data) {
    if (!process.env.GOOGLE_CHAT_ROOM_HOOK || !data.length) return
    const message = this.messageFactory.CreateMessage(ChannelProviders.GoogleChat, data)
    await this.requestService.post(process.env.GOOGLE_CHAT_ROOM_HOOK, message);
  }
}
