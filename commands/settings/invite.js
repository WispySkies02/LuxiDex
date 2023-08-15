const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'invite',
    aliases: ['inv'],
    format: 'invite',
    description: 'Invite LuxiDex to your server.',
    execute(message, args) {
        let invitelink = new MessageEmbed()
            .setTitle('Invite LuxiDex')
            .setColor('GREEN')
            .setDescription(
      `You can invite me by clicking [here](https://discord.com/oauth2/authorize?client_id=713542823454048277&scope=bot%20applications.commands&permissions=2147483647)`);
    message.channel.send(invitelink);
    },
};
