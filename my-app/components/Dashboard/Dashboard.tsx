'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchAllPokemon } from '@/lib/services/api';
import { PaginationComponent } from '../Pagination/Pagination';
import Image from 'next/image';
import { Pokemon } from '@/lib/types/pokemon';
import { LoadingSpinner } from '../ui/spinner';

export default function Dashboard() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const allPokemon = await fetchAllPokemon();
        const sortedPokemon = allPokemon.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setPokemonList(sortedPokemon);
        setFilteredPokemon(sortedPokemon);
        setTotalPages(Math.ceil(sortedPokemon.length / itemsPerPage));
        setHasLoaded(true);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setError('Failed to fetch Pokemon. Please try again later.');
      }
      setLoading(false);
    };

    loadPokemon();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredPokemon(pokemonList);
      setTotalPages(Math.ceil(pokemonList.length / itemsPerPage));
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredPokemon(pokemonList);
      setTotalPages(Math.ceil(pokemonList.length / itemsPerPage));
    } else {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemon(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>Pokemon Finder</h1>

      <div className='flex gap-2 mb-8'>
        <Input
          type='text'
          placeholder='Search Pokemon...'
          value={searchQuery}
          onChange={handleInputChange}
          className='flex-grow'
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <LoadingSpinner className='h-8 w-8' />
        </div>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : filteredPokemon.length === 0 && hasLoaded ? (
        <p className='text-center'>No Pokemon found.</p>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 py-4'>
          {displayedPokemon.map((pokemon) => (
            <div
              key={pokemon.name}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split('/')[pokemon.url.split('/').length - 2]
                }.png`}
                alt={pokemon.name}
                width={200}
                height={200}
                className='w-48 h-48 object-contain mx-auto'
              />
              <div className='p-4'>
                <h2 className='text-lg font-semibold capitalize'>
                  {pokemon.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
