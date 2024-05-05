import { fireEvent, render, screen } from '@testing-library/react';

import { ListArtist } from '../../../Types/Artist';
import { ListAlbum } from '../../../Types/Album';
import { AuthContext } from '../../../Contexts';
import { ListSong } from '../../../Types/Song';
import Card from './index';

describe('Card', () => {
  describe('Models Logic', () => {
    it('renders Album Card without crashing', () => {
      const mockData: ListAlbum = {
        name: 'Test Album Name',
        uid: 'test-album-uuid',
        type: {
          code: 'M',
          name: 'Mixtape'
        },
        image: 'http://test123',
        release_date: new Date(),
        favorites: 0
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
        uid: 'test-artist-uid',
        image: 'http://test123',
        favorites: 0
      };
      render(<Card model="artists" data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Favorites Logic', () => {
    const mockData: ListArtist = {
      name: 'Test Artist Name',
      uid: 'test-artist-uid',
      image: 'http://test123',
      favorites: 0
    };
    const mockAuthContext = {
      uid: 'test-uid-123',
      isAuthenticated: true,
      dispatch: () => null
    };

    it('renders Favorite Icon on hover', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Card
            model="artists"
            data={mockData}
            loading={false}
            favoriteFn={() => Promise.resolve({ favorites: {} })}
          />
        </AuthContext.Provider>
      );
      const card = screen.getByTestId('card');
      fireEvent.mouseEnter(card);
      const icon = screen.queryByTestId('card-favorite-icon');
      expect(icon).toBeInTheDocument();
    });

    it("doesn't render Favorite Icon when unauthenticated", () => {
      render(
        <AuthContext.Provider
          value={{ ...mockAuthContext, isAuthenticated: false }}
        >
          <Card
            model="artists"
            data={mockData}
            loading={false}
            favoriteFn={() => Promise.resolve({ favorites: {} })}
          />
        </AuthContext.Provider>
      );
      const card = screen.getByTestId('card');
      fireEvent.mouseEnter(card);
      const icon = screen.queryByTestId('card-favorite-icon');
      expect(icon).not.toBeInTheDocument();
    });

    it("doesn't render Favorite Icon when favoriteFn is not passed", () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Card model="artists" data={mockData} loading={false} />
        </AuthContext.Provider>
      );
      const card = screen.getByTestId('card');
      fireEvent.mouseEnter(card);
      const icon = screen.queryByTestId('card-favorite-icon');
      expect(icon).not.toBeInTheDocument();
    });

    it("doesn't render Favorite Icon when not hovering", () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Card
            model="artists"
            data={mockData}
            loading={false}
            favoriteFn={() => Promise.resolve({ favorites: {} })}
          />
        </AuthContext.Provider>
      );
      const icon = screen.queryByTestId('card-favorite-icon');
      expect(icon).not.toBeInTheDocument();
    });

    it("doesn't render Favorite Icon when loading", () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Card
            model="artists"
            data={mockData}
            loading={true}
            favoriteFn={() => Promise.resolve({ favorites: {} })}
          />
        </AuthContext.Provider>
      );
      const card = screen.getByTestId('card');
      fireEvent.mouseEnter(card);
      const icon = screen.queryByTestId('card-favorite-icon');
      expect(icon).not.toBeInTheDocument();
    });
  });
});
