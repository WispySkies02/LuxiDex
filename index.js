const { Client, Collection } = require('discord.js'); // importing discord.js and deconstructing it into just Client.

let bot = new Client({ // client declaration.
  fetchAllMembers: true, // Remove this if the bot is in large guilds.
  presence: {
    status: 'online',
    activity: {
      name: `Coded by WispySkies02`,
      type: 'PLAYING'
    }
  }
});

const config = require('./config');
//const commands = require('./help');
bot.commands = new Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  console.log(`Loaded command: ${command.name}`)
  bot.commands.set(command.name, command);
}
require('dotenv').config();

bot.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  const command = bot.commands.get(commandName) 
    || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  try {
      command.execute(message, args);
  } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
  }
});


bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

require('./server')();
bot.login(process.env.TOKEN);
