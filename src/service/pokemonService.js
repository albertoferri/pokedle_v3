import pokemon from 'pokemontcgsdk';
import axios from 'axios';

pokemon.configure({ apiKey: '7c1da767-856c-4eac-9b42-68ed220d3a78' });

const getCardById = async (id) => {
  try {
    const card = await pokemon.card.find(id);
    return card;
  } catch (error) {
    console.error(`Error fetching card with ID ${id}:`, error);
    throw error;
  }
};

const getSetById = async (id) => {
  try {
    const set = await pokemon.set.find(id);
    return set;
  } catch (error) {
    console.error(`Error fetching set with ID ${id}:`, error);
    throw error;
  }
};



const getAllSets = async () => { 
  try { 
    const response = await pokemon.set.all(); 
    // console.log('Risposta API:', response);
    return response; } 
    catch (error) { 
    console.error('Error fetching sets:', error); 
    throw error; 
    }
};

const getCardsBySet = async (setId) => { try { const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`); return response.data.data; } catch (error) { console.error(`Error fetching cards for set ${setId}:`, error); throw error; } };
const getSupertypes = async () => {
  try {
    const supertypes = await pokemon.supertype.all();
    return supertypes;
  } catch (error) {
    console.error('Error fetching supertypes:', error);
    throw error;
  }
};

const getSubtypes = async () => {
  try {
    const subtypes = await pokemon.subtype.all();
    return subtypes;
  } catch (error) {
    console.error('Error fetching subtypes:', error);
    throw error;
  }
};

const getTypes = async () => {
  try {
    const types = await pokemon.type.all();
    return types;
  } catch (error) {
    console.error('Error fetching types:', error);
    throw error;
  }
};

const getRarities = async () => {
  try {
    const rarities = await pokemon.rarity.all();
    return rarities;
  } catch (error) {
    console.error('Error fetching rarities:', error);
    throw error;
  }
};

const searchCardsByName = async (name) => {
  try {
    const response = await pokemon.card.all({ q: `name:${name}` });
    return response.data;
  } catch (error) {
    console.error(`Error searching cards by name "${name}":`, error);
    throw error;
  }
};

const getRandomCard = async () => {
  try {
    const response = await pokemon.card.where({ pageSize: 1, page: Math.floor(Math.random() * 1000) });
    const card = response.data[0];
    return card;
  } catch (error) {
    console.error('Error fetching random Pokémon card:', error);
    throw error;
  }
};

export default {
  getCardById,
  getSetById,
  getAllSets,
  getCardsBySet,
  getSupertypes,
  getSubtypes,
  getTypes,
  getRarities,
  searchCardsByName,
  getRandomCard,
};
