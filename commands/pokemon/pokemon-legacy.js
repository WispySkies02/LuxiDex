const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: 'pokemon',
  description: 'Search the Pokédex for information.',
  aliases: ['pkmn'],
  format: 'pokemon <pokemon name>',
  async execute(message, args) {
    if (!args.length) {
      return message.channel.send('You need to provide a Pokémon name.');
    }

    const pokemonName = args[0].toLowerCase();
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = response.data;

      const abilities = pokemonData.abilities.map(ability => toTitleCase(ability.ability.name.replace(/-/g, ' '))).join(', ');
      const pokemonNameFormatted = toTitleCase(pokemonData.name);

      const speciesResponse = await axios.get(pokemonData.species.url);
      const speciesData = speciesResponse.data;
      const pokedexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

      const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
      const evolutionData = evolutionResponse.data;

      const evolutionChainFormatted = await formatEvolutionChain(evolutionData.chain);

      const embed = new Discord.MessageEmbed()
        .setTitle(`Information about ${pokemonNameFormatted}`)
        .setDescription(`Height: ${pokemonData.height} m\nWeight: ${pokemonData.weight} kg`)
        .addField('Abilities:', abilities)
        .addField('Pokédex Entry:', pokedexEntry)
        .addField('Evolution Chain:', evolutionChainFormatted)
        .setThumbnail(pokemonData.sprites.front_default);

      message.channel.send(embed);
    } catch (error) {
      console.error('API Error:', error);
      message.channel.send(`Could not find information for ${pokemonName}`);
    }
  },
};

function toTitleCase(text) {
  return text.replace(/-/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function formatEvolutionChain(chain) {
  let formattedChain = '';

  async function traverse(chainSegment) {
    const speciesName = toTitleCase(chainSegment.species.name.replace(/-/g, ' '));
    const evolutionDetails = await getEvolutionMethod(chainSegment.evolves_to[0]?.evolution_details);

    if (chainSegment.evolves_to.length > 0) {
      if (formattedChain !== '') {
        formattedChain += '\n\n';
      }
      formattedChain += `${speciesName} -> ${toTitleCase(chainSegment.evolves_to[0].species.name.replace(/-/g, ' '))}\n`;
      formattedChain += `${evolutionDetails.join('\n')}`;
      await traverse(chainSegment.evolves_to[0]);
    } else {
      formattedChain += `\n${evolutionDetails.join('\n')}`;
    }
  }

  await traverse(chain);

  return formattedChain;
}

async function getEvolutionMethod(evolutionDetails) {
  if (!evolutionDetails || evolutionDetails.length === 0) {
    return [];
  }

  const methods = [];

  for (const detail of evolutionDetails) {
    if (detail.min_level !== undefined) {
      if (detail.item) {
        methods.push(`Level up with ${toTitleCase(detail.item.name.replace(/-/g, ' '))} (Min level: ${detail.min_level})`);
      } else if (detail.trigger && detail.trigger.name === 'level-up-day') {
        methods.push(`Level up during the day with max friendship (Min level: ${detail.min_level})`);
      } else if (detail.trigger && detail.trigger.name === 'level-up-night') {
        methods.push(`Level up at night with max friendship (Min level: ${detail.min_level})`);
      } else if (detail.trigger && detail.trigger.name === 'level-up-hold-item') {
        methods.push(`Level up while holding a specific item (Min level: ${detail.min_level})`);
      } else if (detail.trigger && detail.trigger.name === 'level-up-move') {
        methods.push(`Level up with a specific move (Min level: ${detail.min_level})`);
      } else if (detail.trigger && detail.trigger.name === 'affection' && detail.min_affection !== undefined) {
        methods.push(`Level up with high affection (Min level: ${detail.min_level})`);
      } else if (detail.trigger && detail.trigger.name === 'trade') {
        methods.push(`Trade with another player to evolve (Min level: ${detail.min_level})`);
      } else if (detail.trigger && detail.trigger.name === 'use-item' && detail.item) {
        methods.push(`Use ${toTitleCase(detail.item.name.replace(/-/g, ' '))} (Min level: ${detail.min_level})`);
      } else if (detail.trigger && detail.trigger.name === 'other') {
        methods.push(`Special condition to evolve (Min level: ${detail.min_level})`);
      } else {
        methods.push(`Level up to evolve (Min level: ${detail.min_level})`);
      }
    } else if (detail.item) {
      methods.push(`Use ${toTitleCase(detail.item.name.replace(/-/g, ' '))}`);
    } else if (detail.trigger) {
      if (detail.trigger.name === 'level-up-day') {
        methods.push(`Level up during the day`);
      } else if (detail.trigger.name === 'level-up-night') {
        methods.push(`Level up at night`);
      } else if (detail.trigger.name === 'level-up-hold-item') {
        methods.push(`Level up while holding a specific item`);
      } else if (detail.trigger.name === 'level-up-move') {
        methods.push(`Level up with a specific move`);
      } else if (detail.trigger.name === 'affection') {
        methods.push(`Level up with high affection`);
      } else if (detail.trigger.name === 'trade') {
        methods.push(`Trade with another player to evolve`);
      } else if (detail.trigger.name === 'use-item') {
        methods.push(`Use ${toTitleCase(detail.item.name.replace(/-/g, ' '))}`);
      } else if (detail.trigger.name === 'other') {
        methods.push(`Special condition to evolve`);
      } else if (detail.trigger.name === 'empty-spot-in-party') {
        methods.push(`Level up at level ${detail.min_level} with an empty spot in the party`);
      } else if (detail.trigger.name === 'location') {
        methods.push(`Level up at ${toTitleCase(detail.location.name.replace(/-/g, ' '))}`);
      } else if (detail.trigger.name === 'time-of-day') {
        methods.push(`Level up during ${detail.time_of_day}`);
      } else if (detail.trigger.name === 'connected-friend') {
        methods.push(`Level up while connected to a friend`);
      } else if (detail.trigger.name === 'defeat-pokemon') {
        methods.push(`Level up after defeating specific Pokémon`);
      } else if (detail.trigger.name === 'coin-count') {
        methods.push(`Level up with ${detail.coin_count} coins in the bag`);
      }
    }
  }

  return methods;
}
