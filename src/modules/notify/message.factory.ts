import { ChannelProviders } from 'src/utils/providers';
import { customHookMessage } from './channels/custom-hook';
import { googleChatRoomMessage } from './channels/google-chat';
import { slackChannelMessage } from './channels/slack';
import { telegramChannelMessage } from './channels/telegram';
import { NotifyModel } from './dto/notify.model';

export class MessageFactory {
  public CreateMessage(channelProvider: string, data: [NotifyModel]) {
    if (channelProvider === ChannelProviders.GoogleChat) {
      return googleChatRoomMessage(data);
    } else if (channelProvider === ChannelProviders.Slack) {
      return slackChannelMessage(data);
    } else if (channelProvider === ChannelProviders.Custom) {
      return customHookMessage(data);
    } else if (channelProvider === ChannelProviders.Telegram) {
      return telegramChannelMessage(data);
    }
    return null;
  }
}
