const { MessageEmbed } = require('discord.js');

const config = {
  prefix: 'ff!', // Replace with your desired prefix
};

module.exports = {
  name: 'help',
  description: 'Help',
  aliases: ['h'],
  execute(message, args, bot) {
    let commands = {
      'help': {
        description: 'Shows the list of commands or help on a specified command.',
        format: 'ff!help | ff!help [command-name]',
      },
      'ping': {
        description: 'Checks connectivity with discord\'s servers.',
        format: 'ff!ping',
      },
      'say': {
        aliases: ['repeat'],
        description: 'Repeats whatever is said.',
        format: 'ff!say <message> | ff!repeat <message>',
      },
      'invite': {
        description: 'Invite the bot to your server.',
        format: 'ff!invite',
      },
      'uptime': {
        aliases: ['time'],
        description: 'Shows how long the bot has been online.',
        format: 'ff!uptime',
      },
    };

    let embed = new MessageEmbed()
      .setTitle('HELP MENU')
      .setColor('BLUE')
      .setFooter(
        `Requested by: ${
          message.member ? message.member.displayName : message.author.username
        }`,
        message.author.displayAvatarURL()
      )
      .setThumbnail(bot.user.displayAvatarURL());

    if (args && args[0]) {
      if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
        let command = Object.keys(commands).includes(args[0].toLowerCase()) ? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
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
        Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n')
      );
    }

    message.channel.send(embed);
  },
};
