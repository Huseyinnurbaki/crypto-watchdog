import { ChannelProviders } from 'src/utils/providers';
import { googleChatRoomMessage } from './channels/google-chat';
import { slackChannelMessage } from './channels/slack';
import { NotifyModel } from './dto/notify.model';

export class MessageFactory {
  public CreateMessage(channelProvider: string, data: [NotifyModel]) {
    if (channelProvider === ChannelProviders.GoogleChat) {
      return googleChatRoomMessage(data);
    } else if (channelProvider === ChannelProviders.Slack) {
      return slackChannelMessage(data);
    }
    return null;
  }
}
