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
                  .setDescription('Info from POKéMON RED & BLUE')
                  .addFields(
                    { name: 'Type:', value: 'GRASS/POISON' },
                    { name: 'Locations:', value: 'PALLET TOWN (Gift)', inline: true },
                    {name: 'Pokedex Entry:', value: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.', inline: true},)
                  .setThumbnail('https://archives.bulbagarden.net/media/upload/a/a3/Spr_1b_001.png')
                  .setFooter('1995-1998 GAME FREAK inc.');
                break;

              case 'Ivysaur':
                embed.setTitle('#002 - IVYSAUR')
                  .setColor('GREEN')
                  .setDescription('Info from POKéMON RED & BLUE')
                  .addFields(
                    { name: 'Type:', value: 'GRASS/POISON' },
                    { name: 'Locations:', value: 'Evolve BULBASAUR (Lv. 16)', inline: true },
                    {name: 'Pokedex Entry:', value: 'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.', inline: true},)
                  .setThumbnail('https://archives.bulbagarden.net/media/upload/5/58/Spr_1b_002.png')
                  .setFooter('1995-1998 GAME FREAK inc.');
                break;

              case 'Venusaur':
                embed.setTitle('#003 - VENUSAUR')
                  .setColor('GREEN')
                  .setDescription('Info from POKéMON RED & BLUE')
                  .addFields(
                    { name: 'Type:', value: 'GRASS/POISON' },
                    { name: 'Locations:', value: 'Evolve IVYSAUR (Lv. 32)', inline: true },
                    {name: 'Pokedex Entry:', value: 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.', inline: true},)
                  .setThumbnail('https://archives.bulbagarden.net/media/upload/f/f6/Spr_1b_003.png')
                  .setFooter('1995-1998 GAME FREAK inc.');
                break;

                case 'Charmander':
                    embed.setTitle('#004 - CHARMANDER')
                      .setColor('RED')
                      .setDescription('Info from POKéMON RED & BLUE')
                      .addFields(
                        { name: 'Type:', value: 'FIRE' },
                        { name: 'Locations:', value: 'PALLET TOWN (Gift)', inline: true },
                        {name: 'Pokedex Entry:', value: 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.', inline: true},)
                      .setThumbnail('https://archives.bulbagarden.net/media/upload/9/9d/Spr_1b_004.png')
                      .setFooter('1995-1998 GAME FREAK inc.');
                    break;
    
                  case 'Charmeleon':
                    embed.setTitle('#005 - CHARMELEON')
                      .setColor('RED')
                      .setDescription('Info from POKéMON RED & BLUE')
                      .addFields(
                        { name: 'Type:', value: 'FIRE' },
                        { name: 'Locations:', value: 'Evolve CHARMANDER (Lv. 16)', inline: true },
                        {name: 'Pokedex Entry:', value: 'When it swings its burning tail, it elevates the temperature to unbearably high levels.', inline: true},)
                      .setThumbnail('https://archives.bulbagarden.net/media/upload/6/6a/Spr_1b_005.png')
                      .setFooter('1995-1998 GAME FREAK inc.');
                    break;
    
                  case 'Charizard':
                    embed.setTitle('#006 - CHARIZARD')
                      .setColor('RED')
                      .setDescription('Info from POKéMON RED & BLUE')
                      .addFields(
                        { name: 'Type:', value: 'FIRE/FLYING' },
                        { name: 'Locations:', value: 'Evolve CHARMELEON (Lv. 36)', inline: true },
                        {name: 'Pokedex Entry:', value: 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.', inline: true},)
                      .setThumbnail('https://archives.bulbagarden.net/media/upload/5/56/Spr_1b_006.png')
                      .setFooter('1995-1998 GAME FREAK inc.');
                    break;

                    case 'Squirtle':
                        embed.setTitle('#007 - SQUIRTLE')
                          .setColor('BLUE')
                          .setDescription('Info from POKéMON RED & BLUE')
                          .addFields(
                            { name: 'Type:', value: 'WATER' },
                            { name: 'Locations:', value: 'PALLET TOWN (Gift)', inline: true },
                            {name: 'Pokedex Entry:', value: 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.', inline: true},)
                          .setThumbnail('https://archives.bulbagarden.net/media/upload/3/30/Spr_1b_007.png')
                          .setFooter('1995-1998 GAME FREAK inc.');
                        break;
        
                      case 'Wartortle':
                        embed.setTitle('#008 - WARTORTLE')
                          .setColor('BLUE')
                          .setDescription('Info from POKéMON RED & BLUE')
                          .addFields(
                            { name: 'Type:', value: 'WATER' },
                            { name: 'Locations:', value: 'Evolve SQUIRTLE (Lv. 16)', inline: true },
                            {name: 'Pokedex Entry:', value: 'Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.', inline: true},)
                          .setThumbnail('https://archives.bulbagarden.net/media/upload/d/d3/Spr_1b_008.png')
                          .setFooter('1995-1998 GAME FREAK inc.');
                        break;
        
                      case 'Blastoise':
                        embed.setTitle('#009 - BLASTOISE')
                          .setColor('BLUE')
                          .setDescription('Info from POKéMON RED & BLUE')
                          .addFields(
                            { name: 'Type:', value: 'WATER' },
                            { name: 'Locations:', value: 'Evolve WARTORTLE (Lv. 36)', inline: true },
                            {name: 'Pokedex Entry:', value: 'A brutal POKéMON with pressurized water jets on its shell. They are used for high speed tackles.', inline: true},)
                          .setThumbnail('https://archives.bulbagarden.net/media/upload/2/2c/Spr_1b_009.png')
                          .setFooter('1995-1998 GAME FREAK inc.');
                        break;

                

              default:
                embed.setDescription('This is not a valid Pokémon.')
                  .setColor('RED');
            }
            message.channel.send(embed);
        }
};
