const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: 'Help',
    aliases: ['h'],
    execute(message, args) {
        let commands = {
            'help': {
                description: 'Shows the list of commands or help on a specified command.',
                format: 'help [command-name]',
            },
            'ping': {
                description: 'Checks connectivity with discord\'s servers.',
                format: 'ping',
            },
            'say': {
                aliases: ['repeat'],
                description: 'Repeats whatever is said.',
                format: 'say <message>',
            },
            'invite': {
                description: 'Invite the bot to your server.',
                format: 'invite',
            },
        }
        let embed = new MessageEmbed()
            .setTitle('HELP MENU')
            .setColor('BLUE')
            .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL());
        if (args[0]) {
            embed
                .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'))
        }
        if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase()) ? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed.setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases) {
                embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
                embed.addField('DESCRIPTION', commands[command].description)
                    .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
            }
        }
        else {
            embed
                .setColor('RED')
                .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
        }
        message.channel.send(embed);
    },
};
