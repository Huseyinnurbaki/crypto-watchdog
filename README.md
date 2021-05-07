![bg](./bg.png "bg")

---
# Crypto Watchdog is a free crypto market observer. 
Queries first 200 coins/tokens every 45 minutes & returns the ones increased more than %10 in an hour & notifies google chat room.


# Prerequisites

Get an api token from https://coinmarketcap.com/ . (I am using Free version)

# Quickstart 🚀

#### Run the following command and you are all set.

```console
$ docker run -d --env CMC_PRO_API_KEY=<YOUR_KEY> --env GOOGLE_CHAT_ROOM_HOOK=<YOUR_HOOK> hhaluk/crypto-watchdog
```


That's it.

# Upcoming

- Slack Webhook
- Custom Webhook

# Development

- create an .env file in the root directory & place your CMC_PRO_API_KEY & GOOGLE_CHAT_ROOM_HOOK inside the .env.
- npm i
- npm start:debug