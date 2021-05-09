import { Injectable, OnModuleInit } from '@nestjs/common';
import { GITHUB_RELEASES } from 'src/utils/paths';
import { RequestService } from '../network/request.service';
import { NotifyModel } from './dto/notify.model';
import { MessageFactory } from './message.factory';
import { ChannelProviders } from 'src/utils/providers';
import { isOutdated } from './notify.helper';

@Injectable()
export class NotifyService implements OnModuleInit {
  messageFactory: MessageFactory;
  constructor(private readonly requestService: RequestService) { }

  onModuleInit() {
    this.messageFactory = new MessageFactory();
  }
  async publish(data: [NotifyModel]) {
    const newerVersion = await this.checkLatestGithubVersion();
    newerVersion && data.unshift(newerVersion);
    if (!data.length) return;
    await this.notifyGoogleChatRoom(data);
    await this.notifySlackChannel(data);
    await this.notifyCustomChannel(data);
    await this.notifyTelegramChannel(data);
  }

  async checkLatestGithubVersion(): Promise<NotifyModel> {
    const publishedVersions = await this.requestService.get(GITHUB_RELEASES);
    return isOutdated(publishedVersions);
  }

  async notifyGoogleChatRoom(data) {
    if (!process.env.GOOGLE_CHAT_ROOM_HOOK) return;
    const message = this.messageFactory.CreateMessage(ChannelProviders.GoogleChat, data);
    await this.requestService.post(process.env.GOOGLE_CHAT_ROOM_HOOK, message);
  }
  async notifySlackChannel(data) {
    if (!process.env.SLACK_CHANNEL_HOOK) return;
    const message = this.messageFactory.CreateMessage(ChannelProviders.Slack, data);
    await this.requestService.post(process.env.SLACK_CHANNEL_HOOK, message);
  }
  async notifyCustomChannel(data) {
    if (!process.env.CUSTOM_CHANNEL_HOOK) return;
    const message = this.messageFactory.CreateMessage(ChannelProviders.Custom, data);
    await this.requestService.post(process.env.CUSTOM_CHANNEL_HOOK, message);
  }
  async notifyTelegramChannel(data) {
    if (!process.env.TELEGRAM_CHANNEL_HOOK) return;
    const message = this.messageFactory.CreateMessage(ChannelProviders.Telegram, data);
    await this.requestService.post(process.env.TELEGRAM_CHANNEL_HOOK, message);
  }
}
