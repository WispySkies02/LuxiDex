module.exports = {
    name: 'role',
    description: 'Add or remove a role from a user.',
    format: 'role @Role Name',
    execute(message, args) {
        // Check if the user has permission to manage roles
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply("You don't have permission to use this command.");
        }

        const targetUser = message.mentions.users.first();
        if (!targetUser) {
            return message.reply('Please mention a user to manage their roles.');
        }

        const roleName = args.slice(1).join(' '); // Role name with spaces
        if (!roleName) {
            return message.reply('Please provide the name of the role to manage.');
        }

        const role = message.guild.roles.cache.find(role => role.name === roleName);
        if (!role) {
            return message.reply(`Role "${roleName}" not found.`);
        }

        const member = message.guild.members.cache.get(targetUser.id);

        // Add or remove the role from the user
        if (member.roles.cache.has(role.id)) {
            member.roles.remove(role)
                .then(() => {
                    message.channel.send(`Removed role "${role.name}" from ${targetUser.tag}`);
                })
                .catch(error => {
                    console.error(error);
                    message.reply('An error occurred while trying to remove the role.');
                });
        } else {
            member.roles.add(role)
                .then(() => {
                    message.channel.send(`Added role "${role.name}" to ${targetUser.tag}`);
                })
                .catch(error => {
                    console.error(error);
                    message.reply('An error occurred while trying to add the role.');
                });
        }
    },
};
