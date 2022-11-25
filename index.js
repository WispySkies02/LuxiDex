const { Client } = require('discord.js');
const config = require('./config');
//const commands = require('./help');
client.commands = new Discord.Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  console.log(`Loaded command: ${command.name}`)
  client.commands.set(command.name, command);
}
require('dotenv').config();

let bot = new Client({
  fetchAllMembers: true, // Remove this if the bot is in large guilds.
  presence: {
    status: 'online',
    activity: {
      name: `Coded by WispySkies02`,
      type: 'PLAYING'
    }
  }
});

bot.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
      client.commands.get(command).execute(message, args);
  } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
  }
});


bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

require('./server')();
bot.login(process.env.TOKEN);
