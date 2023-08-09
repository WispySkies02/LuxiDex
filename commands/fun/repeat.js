module.exports = {
    name: 'repeat',
    aliases: ['r'],
    desription: 'Repeats whatever is said',
    async execute(message, args) {
      if (args.length > 0)
        message.channel.send(args.join(' '));
      else
        message.reply('You did not send a message to repeat, cancelling command.')
      message.delete();
    }
}
