import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ListArtist } from '../../../../Types';
import ArtistCard from '.';

describe('Artist Card', () => {
  const mockData: ListArtist = {
    name: 'Test Artist Name',
    uid: 'test-artist-uuid',
    image: 'http://test123',
    favorites: 0
  };

  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(
        <MemoryRouter>
          <ArtistCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('artist-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    test('renders skeleton when loading', () => {
      render(
        <MemoryRouter>
          <ArtistCard data={mockData} loading />
        </MemoryRouter>
      );
      const card = screen.getByTestId('artist-card-skeleton');
      expect(card).toBeInTheDocument();
    });

    test('renders correct name', () => {
      render(
        <MemoryRouter>
          <ArtistCard data={mockData} />
        </MemoryRouter>
      );
      const name = screen.getByTestId('artist-card-name');
      expect(name.textContent).toEqual(mockData.name);
    });

    test('renders correct image', () => {
      render(
        <MemoryRouter>
          <ArtistCard data={mockData} />
        </MemoryRouter>
      );
      const image = screen.getByTestId('artist-card-image');
      expect(image).toHaveAttribute('src', mockData.image);
    });
  });
});
