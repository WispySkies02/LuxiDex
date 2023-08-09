module.exports = {
    name: 'kick',
    description: 'Kick a member from the server.',
    format: 'kick @user',
    execute(message, args) {
        // Check if the user has permission to kick members
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply("You don't have permission to use this command.");
        }

        const member = message.mentions.members.first();

        // Check if a member was mentioned
        if (!member) {
            return message.reply('Please mention a valid member to kick.');
        }

        // Check if the member can be kicked
        let kickReason = '';

        if (!member.kickable) {
            // Implement your own logic to determine the reason here
            // For example, you could check if the member has a certain role,
            // if they are the server owner, or if they have a specific permission.
            // Set the kickReason variable based on your logic.
            if (member.roles.cache.some(role => role.name === 'Moderator')) {
                kickReason = "Member is a moderator.";
            } else {
                kickReason = "Unknown reason";
            }

            return message.reply(`I can't kick this member. Reason: ${kickReason}`);
        }

        member.kick()
            .then(() => {
                message.channel.send(`Kicked ${member.user.tag}`);
            })
            .catch(error => {
                console.error(error);
                message.reply('An error occurred while trying to kick the member.');
            });
    },
};
