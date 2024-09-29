import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '@/components/Dashboard/Dashboard';
import { fetchAllPokemon } from '@/lib/services/api';

// Mock api call
jest.mock('@/lib/services/api');

const mockPokemonData = Array.from({ length: 20 }, (_, i) => ({
  name: `pokemon-${i + 1}`,
  url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
}));

describe('Dashboard component', () => {
  // Test 1: Check if 10 Pokemon are rendered per page
  it('renders 10 items per page successfully', async () => {
    // Mock the fetchAllPokemon function to return mock data
    (fetchAllPokemon as jest.Mock).mockResolvedValue(mockPokemonData);

    render(<Dashboard />);

    // Wait for data to be loaded
    await waitFor(() => expect(fetchAllPokemon).toHaveBeenCalled());

    // Check that 10 Pokemon are displayed on the page
    const pokemonItems = screen.getAllByRole('img');
    expect(pokemonItems.length).toBe(10);
  });

  // Test 2: Handle API failure
  it('displays an error message when API call fails', async () => {
    // Mock the fetchAllPokemon function to reject with an error
    (fetchAllPokemon as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<Dashboard />);

    // Wait for the loading and the API call to fail
    await waitFor(() => expect(fetchAllPokemon).toHaveBeenCalled());

    // Check if the error mesagge is displayed in the UI
    const errorMessage = screen.getByText(
      'Failed to fetch Pokemon. Please try again later.'
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
