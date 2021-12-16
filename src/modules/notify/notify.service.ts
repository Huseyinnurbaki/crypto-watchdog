import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GITHUB_RELEASES } from 'src/utils/paths';
import { RequestService } from '../network/request.service';
import { NotifyModel } from './dto/notify.model';
import { MessageFactory } from './message.factory';
import { ChannelProviders } from 'src/utils/providers';
import { isOutdated } from './notify.helper';
import { AppConfigs } from 'src/utils/constants';
import { paginate } from 'src/utils/js-utils';
import * as Pigeon from '@hhaluk/pigeon';

@Injectable()
export class NotifyService implements OnModuleInit {
  messageFactory: MessageFactory;
  constructor(private readonly requestService: RequestService) {}
  private readonly logger = new Logger(NotifyService.name);
  itemsPerPage = 8;
  onModuleInit() {
    this.messageFactory = new MessageFactory();
  }

  async publish(data: [NotifyModel]) {
    const newerVersion = await this.checkLatestGithubVersion();
    newerVersion && data.unshift(newerVersion);
    this.logger.warn('number of data will be published -->', data.length.toString());
    if (!data.length) return;
    const numberOfPages = Math.floor(data.length / this.itemsPerPage) + 1;
    for (let i = 1; i <= numberOfPages; i++) {
      const page = paginate(data, this.itemsPerPage, i);
      this.invokeChannels(page);
    }
  }

  invokeChannels(page: [NotifyModel]) {
    this.notifyGoogleChatRoom(page);
    this.notifySlackChannel(page);
    this.notifyTelegramChannel(page);
    this.notifyCustomChannel(page);
  }

  async checkLatestGithubVersion(): Promise<NotifyModel> {
    const publishedVersions = await this.requestService.get(GITHUB_RELEASES);
    return isOutdated(publishedVersions);
  }

  notifyGoogleChatRoom(data) {
    const message = this.messageFactory.CreateMessage(ChannelProviders.GoogleChat, data);
    Pigeon.NotifyGoogleChat(message);
  }
  notifySlackChannel(data) {
    const message = this.messageFactory.CreateMessage(ChannelProviders.Slack, data);
    Pigeon.NotifySlackChannel(message);
  }
  notifyTelegramChannel(data) {
    const message = this.messageFactory.CreateMessage(ChannelProviders.Telegram, data);
    Pigeon.NotifyTelegramChannel(message);
  }
  notifyCustomChannel(data) {
    const message = this.messageFactory.CreateMessage(ChannelProviders.Custom, data);
    Pigeon.NotifyTelegramChannel(AppConfigs.CUSTOM_CHANNEL_HOOK, message);
  }

}
