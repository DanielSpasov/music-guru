import { render, screen } from '@testing-library/react';

import { ListArtist } from '../../../Pages/artists/helpers';
import { ListAlbum } from '../../../Pages/albums/helpers';
import { ListSong } from '../../../Pages/songs/helpers';
import Card from './index';

describe('Card', () => {
  describe('Business Logic', () => {
    it('renders Album Card without crashing', () => {
      const mockData: ListAlbum = {
        name: 'Test Album Name',
        uid: 'test-album-uuid',
        type: {
          code: 'M',
          name: 'Mixtape'
        },
        image: 'http://test123',
        release_date: new Date()
      };
      render(<Card model="albums" data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toBeInTheDocument();
    });

    it('renders Song Card without crashing', () => {
      const mockData: ListSong = {
        name: 'Test Song Name',
        uid: 'test-song-uuid',
        image: 'http://test123',
        artist: 'Test Artist Name'
      };
      render(<Card model="songs" data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toBeInTheDocument();
    });

    it('renders Artist Card without crashing', () => {
      const mockData: ListArtist = {
        name: 'Test Artist Name',
        uid: 'test-artist-uuid',
        image: 'http://test123'
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
