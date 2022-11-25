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

                        case 'Caterpie':
                            embed.setTitle('#010 - CATERPIE')
                              .setColor('A6B91A')
                              .setDescription('Info from POKéMON RED & BLUE')
                              .addFields(
                                { name: 'Type:', value: 'BUG' },
                                { name: 'Locations:', value: 'RED: ROUTE 25 | VIRIDIAN FOREST\n\nBLUE: ROUTE 2 | ROUTE 24 | ROUTE 25 | VIRIDIAN FOREST', inline: true },
                                {name: 'Pokedex Entry:', value: 'Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.', inline: false},)
                              .setThumbnail('https://archives.bulbagarden.net/media/upload/5/5a/Spr_1b_010.png')
                              .setFooter('1995-1998 GAME FREAK inc.');
                            break;
            
                          case 'Metapod':
                            embed.setTitle('#011 - METAPOD')
                              .setColor('A6B91A')
                              .setDescription('Info from POKéMON RED & BLUE')
                              .addFields(
                                { name: 'Type:', value: 'BUG' },
                                { name: 'Locations:', value: 'Evolve CATERPIE (Lv. 7)\n\nRED: ROUTE 25 | VIRIDIAN FOREST\n\nBLUE: ROUTE 24 | ROUTE 25 | VIRIDIAN FOREST', inline: true },
                                {name: 'Pokedex Entry:', value: 'This POKéMON is vulnerable to attack while its shell is soft, exposing its weak and tender body.', inline: true},)
                              .setThumbnail('https://archives.bulbagarden.net/media/upload/e/ef/Spr_1b_011.png')
                              .setFooter('1995-1998 GAME FREAK inc.');
                            break;
            
                          case 'Butterfree':
                            embed.setTitle('#012 - BUTTERFREE')
                              .setColor('A6B91A')
                              .setDescription('Info from POKéMON RED & BLUE')
                              .addFields(
                                { name: 'Type:', value: 'BUG/FLYING' },
                                { name: 'Locations:', value: 'Evolve METAPOD (Lv. 10)', inline: true },
                                {name: 'Pokedex Entry:', value: 'In battle, it flaps its wings at high speed to release highly toxic dust into the air.', inline: true},)
                              .setThumbnail('https://archives.bulbagarden.net/media/upload/f/fa/Spr_1b_012.png')
                              .setFooter('1995-1998 GAME FREAK inc.');
                            break;
            
                            case 'Weedle':
                                embed.setTitle('#013 - WEEDLE')
                                  .setColor('A6B91A')
                                  .setDescription('Info from POKéMON RED & BLUE')
                                  .addFields(
                                    { name: 'Type:', value: 'BUG/POISON' },
                                    { name: 'Locations:', value: 'RED: ROUTE 2 | ROUTE 24 | ROUTE 25 | VIRIDIAN FOREST\n\nBLUE: ROUTE 25 | VIRIDIAN FOREST', inline: true },
                                    {name: 'Pokedex Entry:', value: 'Often found in forests, eating leaves. It has a sharp venomous stinger on its head.', inline: false},)
                                  .setThumbnail('https://archives.bulbagarden.net/media/upload/d/da/Spr_1b_013.png')
                                  .setFooter('1995-1998 GAME FREAK inc.');
                                break;
                
                              case 'Kakuna':
                                embed.setTitle('#014 - KAKUNA')
                                  .setColor('A6B91A')
                                  .setDescription('Info from POKéMON RED & BLUE')
                                  .addFields(
                                    { name: 'Type:', value: 'BUG/POISON' },
                                    { name: 'Locations:', value: 'Evolve WEEDLE (Lv. 7)\n\nRED: ROUTE 24 | ROUTE 25 | VIRIDIAN FOREST\n\nBLUE: ROUTE 25 | VIRIDIAN FOREST', inline: true },
                                    {name: 'Pokedex Entry:', value: 'Almost incapable of moving, this POKéMON can only harden its shell to protect itself from predators.', inline: true},)
                                  .setThumbnail('https://archives.bulbagarden.net/media/upload/0/06/Spr_1b_014.png')
                                  .setFooter('1995-1998 GAME FREAK inc.');
                                break;
                
                              case 'Beedrill':
                                embed.setTitle('#015 - BEEDRILL')
                                  .setColor('A6B91A')
                                  .setDescription('Info from POKéMON RED & BLUE')
                                  .addFields(
                                    { name: 'Type:', value: 'BUG/POISON' },
                                    { name: 'Locations:', value: 'Evolve KAKUNA (Lv. 10)', inline: true },
                                    {name: 'Pokedex Entry:', value: 'Flies at high speed and attacks using its large venomous stingers on its forelegs and tail.', inline: true},)
                                  .setThumbnail('https://archives.bulbagarden.net/media/upload/4/45/Spr_1b_015.png')
                                  .setFooter('1995-1998 GAME FREAK inc.');
                                break;
                

              default:
                embed.setDescription('This is not a valid Pokémon.')
                  .setColor('RED');
            }
            message.channel.send(embed);
        }
};
