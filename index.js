const { Client, Collection } = require('discord.js');
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
const commandFolders = fs.readdirSync('./commands', { withFileTypes: true }).filter(file => file.isDirectory());

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder.name}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder.name}/${file}`);

    console.log(`Loaded command: ${command.name}`);
    bot.commands.set(command.name, command);
  }
}

require('dotenv').config();

bot.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.name === 'searchpokedex') {
    command.execute(message, args);
  } else {
    try {
      command.execute(message, args, bot);
    } catch (error) {
      console.error(error);
      message.reply('Something went wrong trying to execute this command. Try again or contact support!');
    }
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

require('./server')();
bot.login(process.env.TOKEN);
