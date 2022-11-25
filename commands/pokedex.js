const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'pokedex',
    description: 'Pokedex Checker',
    aliases: ['dex'],
    execute(message, args) {
            let embed = new MessageEmbed()
              .setDescription('Something went wrong.')
              .setColor('Red');

            switch (args[0]) {
              case 'Bulbasaur':
                embed.setTitle('#001 - BULBASAUR')
                  .setColor('GREEN')
                  .setDescription('A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.')
                  .setThumbnail('https://archives.bulbagarden.net/media/upload/a/a3/Spr_1b_001.png')
                  .setFooter('POKéMON RED & BLUE | 1195-1998 GAME FREAK inc.');
                break;

              case 'Ivysaur':
                embed.setTitle('#002 - IVYSAUR')
                  .setColor('GREEN')
                  .setDescription('When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.')
                  .setThumbnail('https://archives.bulbagarden.net/media/upload/5/58/Spr_1b_002.png')
                  .setFooter('POKéMON RED & BLUE | 1195-1998 GAME FREAK inc.');
                break;

              case 'Venusaur':
                embed.setTitle('#003 - VENUSAUR')
                  .setColor('GREEN')
                  .setDescription('The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.')
                  .setThumbnail('https://archives.bulbagarden.net/media/upload/f/f6/Spr_1b_003.png')
                  .setFooter('POKéMON RED & BLUE | 1195-1998 GAME FREAK inc.');
                break;

              default:
                embed.setDescription('This is not a valid Pokémon.')
                  .setColor('RED');
            }
            message.channel.send(embed);
        }
};
