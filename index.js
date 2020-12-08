const fs = require('fs');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');

const player = new Player(client);
client.player = player;
client.config = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');
loikhuyen = require('./loikhuyen.json');
var temp_loikhuyen = loikhuyen;
client.commands = new discord.Collection();

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./player-events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        client.player.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

client.on('message', async msg => {
    if (msg.author.bot) return;

    if (msg.content.startsWith(client.config.prefix)) {
        const args = msg.content.slice(client.config.prefix.length).split(/ +/);
        const command = args[0].toLowerCase();
        console.log(command);
        if (command === 'loikhuyen') {
            if( temp_loikhuyen.loikhuyen.length < 1 ){
                temp_loikhuyen = loikhuyen;
            }
            var rand = Math.floor(Math.random() * temp_loikhuyen.loikhuyen.length);

            msg.reply(temp_loikhuyen.loikhuyen[rand]);
            temp_loikhuyen.loikhuyen.splice(rand,1);
            console.log(temp_loikhuyen.loikhuyen.length);
            return;
        }
    }
})

client.login(process.env.BOT_TOKEN);
