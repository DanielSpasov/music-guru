import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Card from './index';

describe('Card', () => {
  describe('Business Logic', () => {
    it('renders Album Card without crashing', () => {
      const mockData = {
        name: 'Test Album Name',
        uid: 'test-album-uuid',
        type: {
          code: 'A',
          name: 'Album'
        },
        image: 'http://test123',
        created_at: new Date(),
        release_date: new Date(),
        created_by: 'test-user-uuid',
        artist: 'test-artist-uuid',
        songs: ['test-song-uuid', 'test-song-uuid-2']
      };
      render(<Card model="albums" data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toBeInTheDocument();
    });

    it('renders Song Card without crashing', () => {
      const mockData = {
        name: 'Test Song Name',
        uid: 'test-song-uuid',
        image: 'http://test123',
        created_at: new Date(),
        created_by: 'test-user-uuid',
        artist: 'Test Artist Name',
        features: []
      };
      render(<Card model="songs" data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toBeInTheDocument();
    });

    it('renders Artist Card without crashing', () => {
      const mockData = {
        name: 'Test Artist Name',
        uid: 'test-artist-uuid',
        image: 'http://test123',
        created_at: new Date(),
        created_by: 'test-user-uuid',
        features: [],
        albums: [],
        songs: [],
        bio: 'Test Bio'
      };
      render(<Card model="artists" data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toBeInTheDocument();
    });

    it('renders none if model is not provided', () => {
      render(<Card data={{}} />);

      const albumCard = screen.queryByTestId('album-card');
      expect(albumCard).not.toBeInTheDocument();

      const songCard = screen.queryByTestId('song-card');
      expect(songCard).not.toBeInTheDocument();

      const artistCard = screen.queryByTestId('artist-card');
      expect(artistCard).not.toBeInTheDocument();
    });
  });
});
