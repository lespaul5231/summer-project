var TelegramBot = require('node-telegram-bot-api');
var PythonShell = require('python-shell');
// Authorized users, replace with your real IDs
var authorized_users = [111111111,];
var token = 'bot token';
var options_bot = { polling: true };
// Setup polling way 
var bot = new TelegramBot(token, options_bot);
console.log('Bot is ready now!');

bot.on('message', function (message) {
    parseMessage(message);
});

// Function that handles a new message
function parseMessage(message) {

    if (!isAuthorized(message.from.id)) {
        bot.sendMessage(message.chat.id, 'User iD '+message.from.id);
        return;
    }

    switch (true) {
        case message.text == "/gettemp":
            PythonShell.run('gettemp.py', function (err, results) {
                console.log('finished gettemp.py');
                var temp = Math.round(results * 10) / 10;
                bot.sendMessage(message.chat.id, 'Current temperature: '+ temp + 'deg C');
            });
            break;

        case message.text == "/gethum":
            PythonShell.run('gethum.py', function (err, results) {
                console.log('finished gethum.py');
                var humidity = Math.round(Math.abs(results * 10)) / 10;
                bot.sendMessage(message.chat.id, 'Current humidity: ' + humidity + '%');
            });
            break;

        case /^\/echo/.test(message.text):
            var command = message.text.replace("/echo ", "");
            bot.sendMessage(message.chat.id, command);
            break;

        case /^\/show/.test(message.text):
            var command = message.text.replace("/show ", "");
            bot.sendMessage(message.chat.id, 'Showing: "' + command + '" on the LED array');
            PythonShell.run('show_msg.py', { args: [command] }, function (err) {
                console.log('finished show_msg.py');
            });
            break;

        case message.photo != null:
            var downloadDir = '/home/pi/Desktop/Jarvis/HomeAutomationBOT/image';
            console.log('get a photo');
            console.log(message.photo[1]);
            bot.downloadFile(message.photo[1].file_id, downloadDir)
                .then(function (filepath) {
                    console.log(filepath);
                    bot.sendMessage(message.chat.id, 'got your photo! Stored as ' + filepath);
                });
    }
}

// Function that checks if the user is authorized (its id is in the array)
function isAuthorized(userid) {
    for (i = 0; i < authorized_users.length; i++)
        if (authorized_users[i] == userid) return true;
    return false;
}


