module.exports = {
    name: 'ban',
    description: 'Ban a member from the server.',
    format: 'ban @user',
    execute(message, args) {
        // Check if the user has permission to ban members
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply("You don't have permission to use this command.");
        }

        const member = message.mentions.members.first();

        // Check if a member was mentioned
        if (!member) {
            return message.reply('Please mention a valid member to ban.');
        }

        // Check if the member can be banned
        let banReason = '';

        if (!member.bannable) {
            if (member.roles.cache.some(role => role.name === 'Moderator')) {
                banReason = "Member is a moderator.";
            } else {
                banReason = "Unknown reason";
            }

            return message.reply(`I can't ban this member. Reason: ${banReason}`);
        }

        member.ban()
            .then(() => {
                message.channel.send(`Banned ${member.user.tag}`);
            })
            .catch(error => {
                console.error(error);
                message.reply('An error occurred while trying to ban the member.');
            });
    },
};
