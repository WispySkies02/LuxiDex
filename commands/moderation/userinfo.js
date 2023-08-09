const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  async execute(message, args, bot) { // Change the order of parameters here
    const member = message.mentions.members?.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!member) return message.channel.send('Please mention the user for the userinfo..');

    const userFlags = (await member.user.fetchFlags()).toArray();
    const activities = [];
    let customStatus;

    for (const activity of member.presence.activities.values()) {
      switch (activity.type) {
        case 'PLAYING':
          activities.push(`Playing **${activity.name}**`);
          break;
        case 'LISTENING':
          if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
          else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
          break;
        case 'WATCHING':
          activities.push(`Watching **${activity.name}**`);
          break;
        case 'STREAMING':
          activities.push(`Streaming **${activity.name}**`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = activity.state;
          break;
      }
    }

    const uiembed = new MessageEmbed()
      .setTitle(`${member.displayName}'s Information`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addField('User', member, true)
      .addField('Discriminator', `\`#${member.user.discriminator}\``, true)
      .addField('ID', `\`${member.id}\``, true)
      .addField('Status', member.presence.status, true)
      .addField('Bot', `\`${member.user.bot}\``, true)
      .addField('Color Role', member.roles.color || '`None`', true)
      .addField('Highest Role', member.roles.highest, true)
      .addField('Joined server on', `\`${moment(member.joinedAt).format('MMM DD YYYY')}\``, true)
      .addField('Joined Discord on', `\`${moment(member.user.createdAt).format('MMM DD YYYY')}\``, true)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(member.displayHexColor);

    if (activities.length > 0) uiembed.setDescription(activities.join('\n'));
    if (customStatus) uiembed.spliceFields(0, 0, { name: 'Custom Status', value: customStatus });

    message.channel.send(uiembed);
  },
};
