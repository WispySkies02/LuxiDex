const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'uptime',
    aliases: ['time'],
    description: 'Shows how long LuxiDex has been online.',
    format: 'uptime',

    execute(message, args, client) {

        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

            message.channel.send(`I have been online for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
    },
};