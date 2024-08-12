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

  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ArtistCard data={mockData} />
      </MemoryRouter>
    );

    const card = screen.getByTestId('artist-card');
    expect(card).toBeInTheDocument();

    const name = screen.getByTestId('artist-card-name');
    expect(name.textContent).toEqual(mockData.name);

    const image = screen.getByTestId('artist-card-image');
    expect(image).toHaveAttribute('src', mockData.image);
  });

  test('renders skeleton when loading', () => {
    render(
      <MemoryRouter>
        <ArtistCard data={mockData} loading />
      </MemoryRouter>
    );

    const skeletonCard = screen.getByTestId('artist-card-skeleton');
    expect(skeletonCard).toBeInTheDocument();

    const card = screen.queryByTestId('artist-card');
    expect(card).not.toBeInTheDocument();
  });
});
