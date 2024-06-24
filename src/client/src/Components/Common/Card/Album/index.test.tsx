import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import {
  darkProps,
  lightProps,
  darkHoverProps,
  lightHoverProps,
  darkHoverTextProps,
  lightHoverTextProps
} from './helpers';
import AlbumCard from '.';
import { ListAlbum } from '../../../../Types/Album';

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
    release_date: new Date(),
    favorites: 0
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    it('renders skeleton when loading', () => {
      render(<AlbumCard data={mockData} loading />);
      const card = screen.getByTestId('album-card-skeleton');
      expect(card).toBeInTheDocument();
    });

    it('renders correct name', () => {
      render(<AlbumCard data={mockData} />);
      const name = screen.getByTestId('album-card-name');
      expect(name.textContent).toEqual(mockData.name);
    });

    it('renders correct image', () => {
      render(<AlbumCard data={mockData} />);
      const image = screen.getByTestId('album-card-image');
      expect(image).toHaveAttribute('src', mockData.image);
    });

    it('renders correct release date', () => {
      render(<AlbumCard data={mockData} />);
      const releaseDate = screen.getByTestId('album-card-release-date');
      expect(releaseDate.textContent).toEqual(
        mockData?.release_date?.getFullYear().toString()
      );
    });

    it('renders TBA if release date is not available', () => {
      const data = { ...mockData, release_date: null };
      render(<AlbumCard data={data} />);
      const releaseDate = screen.getByTestId('album-card-release-date');
      expect(releaseDate.textContent).toEqual('TBA');
    });

    it('renders correct type', () => {
      render(<AlbumCard data={mockData} />);
      const type = screen.getByTestId('album-card-type');
      expect(type.textContent).toEqual(mockData.type.name);
    });

    it('calls onClick when clicked', () => {
      const onClick = vi.fn();
      render(<AlbumCard data={mockData} onClick={onClick} />);
      const card = screen.getByTestId('album-card');
      card.click();
      expect(onClick).toBeCalled();
    });
  });

  describe('CSS', () => {
    it('renders dark mode', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(darkProps);
    });

    it('renders light mode', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(lightProps);
    });

    it('renders dark mode hover', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(darkHoverProps);
    });

    it('renders light mode hover', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(lightHoverProps);
    });

    it('renders dark mode hover text', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(darkHoverTextProps);
    });

    it('renders light mode hover text', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(lightHoverTextProps);
    });
  });
});
