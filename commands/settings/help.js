const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

const config = {
  prefix: 'ff!',
};

module.exports = {
  name: 'help',
  description: 'Shows Floofy Fluff\'s commands.',
  aliases: ['h'],
  execute(message, args, bot) {
    const commandFiles = fs.readdirSync(path.join(__dirname, '..', 'commands')).filter(file => file.endsWith('.js'));

    const excludedCommands = ['help', 'ping', 'say', 'invite', 'uptime', 'userinfo', 'serverinfo', 'pokedex'];

    const commands = {};
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      if (command.name && !excludedCommands.includes(command.name)) {
        commands[command.name] = {
          description: command.description,
          format: command.format,
          aliases: command.aliases,
        };
      }
    }

    let embed = new MessageEmbed()
      .setTitle('FLOOFY FLUFF\'S COMMANDS')
      .setColor('BLUE')
      .setFooter(
        `Requested by: ${
          message.member ? message.member.displayName : message.author.username
        }`,
        message.author.displayAvatarURL()
      )
      .setThumbnail(bot.user.displayAvatarURL());

    if (args && args[0]) {
      if (Object.keys(commands).includes(args[0].toLowerCase())) {
        let command = args[0].toLowerCase();
        embed.setTitle(`COMMAND - ${command}`);

        if (commands[command].aliases) {
          embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
        }
        
        embed.addField('DESCRIPTION', commands[command].description)
          .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
      } else {
        embed
          .setColor('RED')
          .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
      }
    } else {
      embed.setDescription(
        Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\`:${commands[command].description}`).join('\n')
      );
    }

    message.channel.send(embed);
  },
};
