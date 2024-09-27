import axios from 'axios';
import { Pokemon } from '@/lib/types/pokemon';

const POKE_API_URL = process.env.NEXT_PUBLIC_POKE_API_URL;

export const fetchAllPokemon = async (): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(`${POKE_API_URL}pokemon?limit=1000`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    return [];
  }
};
