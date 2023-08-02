const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client({
  fetchAllMembers: true,
  presence: {
    status: 'online',
    activity: {
      name: `Coded by WispySkies02`,
      type: 'PLAYING',
    },
  },
});

const config = require('./config');
bot.commands = new Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(`Loaded command: ${command.name}`);
  bot.commands.set(command.name, command);
}

require('dotenv').config();

bot.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  try {
    command.run(bot, message, args); // Pass the 'bot', 'message', and 'args' objects to the command
  } catch (error) {
    console.error(error);
    message.reply('something went wrong trying to display this command. Try again or contact support!');
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

require('./server')();
bot.login(process.env.TOKEN);
