#summer-project
1. install node-js: https://learn.adafruit.com/node-embedded-development/installing-node-dot-js
```bash
$ node telebot.js #exmaple
```
2. install node-telegram-bot-api: https://www.npmjs.com/package/node-telegram-bot-api
3. install python-shell: https://www.npmjs.com/package/python-shell
4. install pm2: https://www.npmjs.com/search?q=pm2
```bash
$ pm2 start telebot.js
$ pm2 save # Save current process list
$ pm2 startup # Generate a startup script to respawn PM2 on boot
```
