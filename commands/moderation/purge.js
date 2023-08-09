module.exports = {
    name: 'purge',
    description: 'Clear a specified number of messages',
    async execute(message, args) {
        const numToDeleteQuestion = await message.reply('How many messages should be deleted? (1-50)');
        
        const filter = response => {
            const num = parseInt(response.content);
            return !isNaN(num) && num >= 1 && num <= 50 && response.author.id === message.author.id;
        };

        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });

        const numToDelete = parseInt(collected.first().content);

        if (numToDelete) {
            const actualNumToDelete = numToDelete + 3; // Adding 3 to the specified number to account for the bot command, the follow up question and reply
            message.channel.bulkDelete(actualNumToDelete, true)
                .then(deletedMessages => {
                    message.channel.send(`Deleted ${numToDelete} messages.`);
                })
                .catch(error => {
                    console.error(error);
                    message.reply('An error occurred while trying to delete messages.');
                });
        } else {
            message.reply('Invalid number of messages to delete.');
        }
    },
};
