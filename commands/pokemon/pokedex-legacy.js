const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'pokedex-legacy',
  description: 'Search the Pokédex for information.',
  aliases: ['dexleg'],
  format: 'dex <pokemon name>',
  async execute(message, args) {
    if (!args.length) {
      return message.channel.send('You need to provide a Pokémon name.');
    }

    const pokemonName = args[0].toLowerCase();
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = response.data;

      // Fetch abilities
      const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');

      // Fetch species data
      const speciesResponse = await axios.get(pokemonData.species.url);
      const speciesData = speciesResponse.data;
      const pokedexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

      // Fetch evolution chain
      const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
      const evolutionData = evolutionResponse.data;

      // Format the evolution chain
      const evolutionChain = formatEvolutionChain(evolutionData.chain);

      const embed = new Discord.MessageEmbed()
        .setTitle(`Information about ${pokemonData.name}`)
        .setDescription(`Height: ${pokemonData.height} m\nWeight: ${pokemonData.weight} kg`)
        .addField('Abilities:', abilities)
        .addField('Pokédex Entry:', pokedexEntry)
        .addField('Evolution Chain:', evolutionChain)
        .setThumbnail(pokemonData.sprites.front_default);

      message.channel.send(embed);
    } catch (error) {
      message.channel.send(`Could not find information for ${pokemonName}`);
    }
  },
};

// Function to format evolution chain
function formatEvolutionChain(chain) {
  let formattedChain = '';

  function traverse(chainSegment) {
    const speciesName = chainSegment.species.name;
    formattedChain += speciesName;

    if (chainSegment.evolves_to.length > 0) {
      formattedChain += ' -> ';
      traverse(chainSegment.evolves_to[0]);
    }
  }

  traverse(chain);

  return formattedChain;
}
