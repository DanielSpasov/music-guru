import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';

import {
  darkProps,
  lightProps,
  darkHoverProps,
  lightHoverProps,
  darkHoverTextProps,
  lightHoverTextProps
} from './helpers';
import AlbumCard from '.';
import { ListAlbum } from '../../../../Types';

describe('Album Card', () => {
  const mockData: ListAlbum = {
    name: 'Test Album Name',
    uid: 'test-album-uuid',
    type: {
      uid: 'test-type-uid',
      code: 'M',
      name: 'Mixtape'
    },
    image: 'http://test123',
    release_date: moment().toISOString(),
    favorites: 0
  };

  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    test('renders skeleton when loading', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} loading />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card-skeleton');
      expect(card).toBeInTheDocument();
    });

    test('renders correct name', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const name = screen.getByTestId('album-card-link');
      expect(name.textContent).toEqual(mockData.name);
    });

    test('renders correct image', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const image = screen.getByTestId('album-card-image');
      expect(image).toHaveAttribute('src', mockData.image);
    });

    test('renders correct release date', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const releaseDate = screen.getByTestId('album-card-release-date');
      expect(releaseDate.textContent).toEqual(
        moment(mockData?.release_date).year().toString()
      );
    });

    test('renders TBA if release date is not available', () => {
      const data = { ...mockData, release_date: null };
      render(
        <MemoryRouter>
          <AlbumCard data={data} />
        </MemoryRouter>
      );
      const releaseDate = screen.getByTestId('album-card-release-date');
      expect(releaseDate.textContent).toEqual('TBA');
    });

    test('renders correct type', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const type = screen.getByTestId('album-card-type');
      expect(type.textContent).toEqual(mockData.type.name);
    });
  });

  describe('CSS', () => {
    test('renders dark mode', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(darkProps);
    });

    test('renders light mode', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(lightProps);
    });

    test('renders dark mode hover', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(darkHoverProps);
    });

    test('renders light mode hover', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(lightHoverProps);
    });

    test('renders dark mode hover text', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(darkHoverTextProps);
    });

    test('renders light mode hover text', () => {
      render(
        <MemoryRouter>
          <AlbumCard data={mockData} />
        </MemoryRouter>
      );
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(lightHoverTextProps);
    });
  });
});
