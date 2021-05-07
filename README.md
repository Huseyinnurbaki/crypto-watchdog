![bg](./bg.png "bg")

---
# Crypto Watchdog is a free crypto market observer. 
Queries first 200 coins/tokens every 45 minutes & returns the ones increased more than %10 in an hour & notifies google chat room.

- www.coingecko.com (default)
- www.coinmarketcap.com (optional)


# Environment Variables :globe_with_meridians:	

|  Name | Mandatory  | Description |
|---|---|---|
| CMC_PRO_API_KEY  | False  | Enables coinmarketcap queries   |
| GOOGLE_CHAT_ROOM_HOOK  | True  | Notifies google chat room. Curently only supported method to send notification    |
| PERCENTAGE  | False  | Percentage used to filter results, default is 10%  |

> Api token (CMC_PRO_API_KEY) can be obtained from https://coinmarketcap.com/api/ . (I am using Free version)


# Quickstart 🚀

#### Run the following command and you are all set.

- Add your environment variables to the following command.

```console
$ docker run -d --env CMC_PRO_API_KEY=<YOUR_KEY> --env GOOGLE_CHAT_ROOM_HOOK=<YOUR_HOOK> --env PERCENTAGE=12 hhaluk/crypto-watchdog
```


That's it.

# Upcoming :construction:	

- Telegram Webhook
- Discord Webhook
- Slack Webhook
- Custom Webhook
- New Coin Listings

# Development :hammer_and_wrench:	

- create an .env file under the root directory & place your Environment Varibles inside the .env. :warning: 

```console
$ npm i
$ npm run start:debug
```
# References

- [Changelog](https://github.com/Huseyinnurbaki/crypto-watchdog/blob/master/changelog.md)

# Licence

- Crypto Watchdog is [MIT Licensed](https://github.com/Huseyinnurbaki/mocktail/blob/master/changelog.md)
