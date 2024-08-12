import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SongCard from '.';
import { ListSong } from '../../../../Types';

describe('Song Card', () => {
  const mockData: ListSong = {
    name: 'Test Song Name',
    uid: 'test-song-uuid',
    image: 'http://test123',
    artist: {
      uid: 'testartistuid',
      name: 'Test artist',
      image: 'http://test123',
      favorites: 0
    },
    favorites: 0
  };

  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <SongCard data={mockData} />
      </MemoryRouter>
    );

    const card = screen.getByTestId('song-card');
    expect(card).toBeInTheDocument();

    const name = screen.getByTestId('song-card-name');
    expect(name.textContent).toEqual(mockData.name);

    const image = screen.getByTestId('song-card-image');
    expect(image).toHaveAttribute('src', mockData.image);

    const artist = screen.getByTestId('song-card-artist');
    expect(artist.textContent).toEqual(mockData.artist.name);
  });

  test('renders skeleton when loading', () => {
    render(
      <MemoryRouter>
        <SongCard data={mockData} loading />
      </MemoryRouter>
    );

    const skeletonCard = screen.getByTestId('song-card-skeleton');
    expect(skeletonCard).toBeInTheDocument();

    const card = screen.queryByTestId('song-card');
    expect(card).not.toBeInTheDocument();
  });

  test('renders default image if no image is provided', () => {
    render(
      <MemoryRouter>
        <SongCard data={{ ...mockData, image: '' }} />
      </MemoryRouter>
    );

    const image = screen.getByTestId('song-card-image');
    expect(image).toHaveAttribute(
      'src',
      '/images/logo/blue-logo-square512.png'
    );
  });
});
