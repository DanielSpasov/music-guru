import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ListArtist, ListAlbum, ListSong } from '../../../Types';
import Card from './index';

describe('Card', () => {
  describe('Models Logic', () => {
    test('renders Album Card without crashing', () => {
      const mockData: ListAlbum = {
        name: 'Test Album Name',
        uid: 'test-album-uuid',
        type: {
          uid: 'test-type-uid',
          code: 'M',
          name: 'Mixtape'
        },
        image: 'http://test123',
        release_date: null,
        favorites: 0
      };
      render(
        <MemoryRouter>
          <Card model="albums" data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card');
      expect(card).toBeInTheDocument();
    });

    test('renders Song Card without crashing', () => {
      const mockData: ListSong = {
        name: 'Test Song Name',
        uid: 'test-song-uuid',
        image: 'http://test123',
        artist: {
          uid: 'testuid',
          image: 'http://test',
          name: 'Test Artist Name',
          favorites: 0
        },
        favorites: 0
      };
      render(
        <MemoryRouter>
          <Card model="songs" data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card');
      expect(card).toBeInTheDocument();
    });

    test('renders Artist Card without crashing', () => {
      const mockData: ListArtist = {
        name: 'Test Artist Name',
        uid: 'test-artist-uid',
        image: 'http://test123',
        favorites: 0
      };
      render(
        <MemoryRouter>
          <Card model="artists" data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('artist-card');
      expect(card).toBeInTheDocument();
    });
  });
});
