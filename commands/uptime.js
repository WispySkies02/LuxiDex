const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'uptime',
    aliases: ['time'],

    execute(client, message, cmd, args, Discord) {

        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        let upEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`I have been online for \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, and \`${seconds}\` seconds.`);

            
            console.log(!message)
            console.log(!message.channel)
            console.log(message)

            message.channel.send(upEmbed);
    },
};