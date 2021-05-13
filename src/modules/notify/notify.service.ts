import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GITHUB_RELEASES } from 'src/utils/paths';
import { RequestService } from '../network/request.service';
import { NotifyModel } from './dto/notify.model';
import { MessageFactory } from './message.factory';
import { ChannelProviders } from 'src/utils/providers';
import { isOutdated } from './notify.helper';
import { AppConfigs } from 'src/utils/constants';
import { paginate } from 'src/utils/js-utils';

@Injectable()
export class NotifyService implements OnModuleInit {
  messageFactory: MessageFactory;
  constructor(private readonly requestService: RequestService) {}
  private readonly logger = new Logger(NotifyService.name);

  onModuleInit() {
    this.messageFactory = new MessageFactory();
  }

// TODO: Remove duplicates 

  async publish(data: [NotifyModel]) {
    const newerVersion = await this.checkLatestGithubVersion();
    newerVersion && data.unshift(newerVersion);
    this.logger.warn('number of data will be published -->', data.length.toString());
    if (!data.length) return;
    const numberOfPages = Math.floor((data.length / 8)) + 1
    for (let i = 1; i < numberOfPages; i++) {
      const page = paginate(data, 8, i)
      await this.invokeChannels(page)
    }

    
  }

  async invokeChannels(page: [NotifyModel]){
    await this.notifyGoogleChatRoom(page);
    await this.notifySlackChannel(page);
    // await this.notifyCustomChannel(page); // not adapted yet
    // await this.notifyTelegramChannel(page);  // not adapted yet
  }

  

  async checkLatestGithubVersion(): Promise<NotifyModel> {
    const publishedVersions = await this.requestService.get(GITHUB_RELEASES);
    return isOutdated(publishedVersions);
  }

  async notifyGoogleChatRoom(data) {
    if (!AppConfigs.GOOGLE_CHAT_ROOM_HOOK) return;
    const message = this.messageFactory.CreateMessage(ChannelProviders.GoogleChat, data);
    await this.requestService.post(AppConfigs.GOOGLE_CHAT_ROOM_HOOK, message);
  }
  async notifySlackChannel(data) {
    if (!AppConfigs.SLACK_CHANNEL_HOOK) return;
    const message = this.messageFactory.CreateMessage(ChannelProviders.Slack, data);
    await this.requestService.post(AppConfigs.SLACK_CHANNEL_HOOK, message);
  }
  async notifyCustomChannel(data) {
    if (!AppConfigs.CUSTOM_CHANNEL_HOOK) return;
    const message = this.messageFactory.CreateMessage(ChannelProviders.Custom, data);
    await this.requestService.post(AppConfigs.CUSTOM_CHANNEL_HOOK, message);
  }
  async notifyTelegramChannel(data) {
    if (!AppConfigs.TELEGRAM_CHANNEL_HOOK) return;
    const message = this.messageFactory.CreateMessage(ChannelProviders.Telegram, data);
    await this.requestService.post(AppConfigs.TELEGRAM_CHANNEL_HOOK, message);
  }
}
