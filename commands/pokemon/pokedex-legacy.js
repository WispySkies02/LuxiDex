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
      console.log('API Response:', response.data); // Debugging: Log API response
      const pokemonData = response.data;

      const abilities = pokemonData.abilities.map(ability => toTitleCase(ability.ability.name.replace(/-/g, ' '))).join(', ');
      const pokemonNameFormatted = toTitleCase(pokemonData.name);

      const speciesResponse = await axios.get(pokemonData.species.url);
      const speciesData = speciesResponse.data;
      const pokedexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

      const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
      const evolutionData = evolutionResponse.data;

      const evolutionChainFormatted = await formatEvolutionChain(evolutionData.chain);

      const evolutionMethod = getEvolutionMethod(evolutionData.chain.evolves_to[0]?.evolution_details[0], pokemonNameFormatted);
      console.log('Evolution Method:', evolutionMethod); // Debugging: Log evolution method
      const embed = new Discord.MessageEmbed()
        .setTitle(`Information about ${pokemonNameFormatted}`)
        .setDescription(`Height: ${pokemonData.height} m\nWeight: ${pokemonData.weight} kg`)
        .addField('Abilities:', abilities)
        .addField('Pokédex Entry:', pokedexEntry)
        .addField('Evolution Chain:', evolutionChainFormatted)
        .addField('Evolution Method:', evolutionMethod) // New field for Evolution Method
        .setThumbnail(pokemonData.sprites.front_default);

      message.channel.send(embed);
    } catch (error) {
      console.error('API Error:', error); // Debugging: Log API error
      message.channel.send(`Could not find information for ${pokemonName}`);
    }
  },
};

function toTitleCase(text) {
  return text.replace(/-/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getEvolutionMethod(evolutionDetail, speciesName) {
  if (!evolutionDetail) {
    return 'Unknown';
  }

  if (evolutionDetail.item) {
    return `Use ${toTitleCase(evolutionDetail.item.name.replace(/-/g, ' '))}`;
  }

  if (evolutionDetail.trigger) {
    return toTitleCase(evolutionDetail.trigger.name.replace(/-/g, ' '));
  }

  if (evolutionDetail.min_level) {
    return `Level up to ${evolutionDetail.min_level}`;
  }

  if (evolutionDetail.location) {
    return `Level up at ${toTitleCase(evolutionDetail.location.name.replace(/-/g, ' '))}`;
  }

  if (evolutionDetail.held_item) {
    return `Level up while holding ${toTitleCase(evolutionDetail.held_item.name.replace(/-/g, ' '))}`;
  }

  if (evolutionDetail.min_affection) {
    return `Level up with high friendship (Affection)`;
  }

  if (evolutionDetail.min_beauty) {
    return `Level up with high beauty`;
  }

  if (evolutionDetail.needs_overworld_rain) {
    return `Level up during rainy weather`;
  }


  return 'Unknown';
}

async function formatEvolutionChain(chain) {
  let formattedChain = '';

  async function traverse(chainSegment) {
    const speciesName = toTitleCase(chainSegment.species.name.replace(/-/g, ' '));
    formattedChain += speciesName;

    if (chainSegment.evolves_to.length > 0) {
      formattedChain += ' -> ';
      await traverse(chainSegment.evolves_to[0]);
    }
  }

  await traverse(chain);

  return formattedChain;
}
