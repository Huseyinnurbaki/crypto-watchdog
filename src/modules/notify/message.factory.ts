import { ChannelProviders } from "src/utils/providers";
import { googleChatRoomMessage } from "./channels/google-chat";
import { NotifyModel } from "./dto/notify.model";

export class MessageFactory {

    public CreateMessage(channelProvider: string ,data: [NotifyModel]) {

        if(channelProvider === ChannelProviders.GoogleChat) {
            return googleChatRoomMessage(data);
        }
        return null
  }

}