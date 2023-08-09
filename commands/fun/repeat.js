module.exports = {
    name: 'repeat',
    description: 'Repeats whatever is said.',
    aliases: ['r'],
    format: 'repeat <message>',

    async execute(message, args) {
      if (args.length > 0)
        message.channel.send(args.join(' '));
      else
        message.reply('You did not send a message to repeat, cancelling command.')
      message.delete();
    }
}
