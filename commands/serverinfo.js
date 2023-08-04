const { MessageEmbed } = require('discord.js');
const moment = require('moment');

// Function to generate a random hexadecimal color code
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const filterLevels = {
  DISABLED: 'Off',
  MEMBERS_WITHOUT_ROLES: 'No Role',
  ALL_MEMBERS: 'Everyone',
};

const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: '(╯°□°）╯︵ ┻━┻',
  VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
};

module.exports = {
  name: 'serverinfo',
  aliases: [],
  description: 'server info...',
  cooldown: 5,
  guildOnly: true, // Set guildOnly to true since this command should only be used in a server context
  args: false,
  execute: async (message, args) => {
    try {
      if (!message.guild) {
        console.error("This command can only be used in a server (guild) context.");
        console.log("Received Message Object:", message);
        return;
      }

      const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
      const members = message.guild.members.cache;
      const channels = message.guild.channels.cache;
      const emojis = message.guild.emojis.cache;

      // Rest of the code remains unchanged
      const chunkSize = 25; // Number of roles to display per field
      const roleChunks = [];
      for (let i = 0; i < roles.length; i += chunkSize) {
        roleChunks.push(roles.slice(i, i + chunkSize).join(', '));
      }

      // Generate a random color for the embed
      const randomColor = getRandomColor();

      const embed = new MessageEmbed()
        .setDescription(`**Server Info**`)
        .setColor(randomColor) // Set the random color for the embed
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField('**General**', [
          `**Name:** ${message.guild.name}`,
          `**ID:** ${message.guild.id}`,
          `**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
          `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
          `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
          `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
          `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`,
          '\u200b'
        ])
        .addField('**Statistics**', [
          `**Role Count:** ${roles.length}`,
          `**Emoji Count:** ${emojis.size}`,
          `**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
          `**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
          `**Member Count:** ${message.guild.memberCount}`,
          `**Humans:** ${members.filter(member => !member.user.bot).size}`,
          `**Bots:** ${members.filter(member => member.user.bot).size}`,
          `**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
          `**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
          `**Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
          '\u200b'
        ]);

      if (roleChunks.length > 0) {
        for (let i = 0; i < roleChunks.length; i++) {
          embed.addField(`Roles [Part ${i + 1}]`, roleChunks[i]);
        }
      } else {
        embed.addField('Roles', 'No roles found on this server.');
      }

      embed.setTimestamp();
      message.channel.send(embed);
    } catch (error) {
      console.error("Error occurred while processing the 'serverinfo' command:", error);
    }
  },
};
