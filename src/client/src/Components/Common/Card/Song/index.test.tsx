import { render, screen } from '@testing-library/react';

import {
  darkHoverProps,
  darkHoverTextProps,
  darkProps,
  lightHoverProps,
  lightHoverTextProps,
  lightProps
} from './helpers';
import SongCard from '.';
import { ListSong } from '../../../../Types/Song';
import { MemoryRouter } from 'react-router-dom';

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

  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    test('renders skeleton when loading', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} loading />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card-skeleton');
      expect(card).toBeInTheDocument();
    });

    test('renders correct name', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const name = screen.getByTestId('song-card-name');
      expect(name.textContent).toEqual(mockData.name);
    });

    test('renders correct image', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const image = screen.getByTestId('song-card-image');
      expect(image).toHaveAttribute('src', mockData.image);
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

    test('renders correct artist', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const artist = screen.getByTestId('song-card-artist');
      expect(artist.textContent).toEqual(mockData.artist.name);
    });
  });

  describe('CSS', () => {
    test('renders dark mode', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass(darkProps);
    });

    test('renders light mode', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass(lightProps);
    });

    test('renders dark mode hover', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass(darkHoverProps);
    });

    test('renders light mode hover', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass(lightHoverProps);
    });

    test('renders dark mode text', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass(darkHoverTextProps);
    });

    test('renders light mode text', () => {
      render(
        <MemoryRouter>
          <SongCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass(lightHoverTextProps);
    });
  });
});
