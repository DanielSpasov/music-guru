import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AlbumCard from './Album';

describe('Album Card', () => {
  const mockData = {
    name: 'Test Album Name',
    uid: 'test-album-uuid',
    type: {
      code: 'M',
      name: 'Mixtape'
    },
    image: 'http://test123',
    created_at: new Date(),
    release_date: new Date(),
    created_by: 'test-user-uuid',
    artist: 'test-artist-uuid',
    songs: ['test-song-uuid', 'test-song-uuid-2']
  };

  describe('Business Logic', () => {
    it('renders without crashing', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toBeInTheDocument();
    });

    it('renders skeleton when loading', () => {
      render(<AlbumCard data={mockData} loading />);
      const card = screen.getByTestId('album-card-skeleton');
      expect(card).toBeInTheDocument();
    });

    it('renders correct name', () => {
      render(<AlbumCard data={mockData} />);
      const name = screen.getByText(mockData.name);
      expect(name).toBeInTheDocument();
    });

    it('renders correct image', () => {
      render(<AlbumCard data={mockData} />);
      const image = screen.getByAltText(mockData.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockData.image);
    });

    it('renders correct release date', () => {
      render(<AlbumCard data={mockData} />);
      const releaseDate = screen.getByText(
        mockData.release_date.getFullYear().toString()
      );
      expect(releaseDate).toBeInTheDocument();
    });

    it('renders correct type', () => {
      render(<AlbumCard data={mockData} />);
      const type = screen.getByText(mockData.type.name);
      expect(type).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
      let clickCounter = 0;
      const onClick = () => {
        clickCounter++;
      };
      render(<AlbumCard data={mockData} onClick={onClick} />);
      const card = screen.getByTestId('album-card');
      card.click();
      expect(clickCounter).toBe(1);
    });
  });

  describe('CSS', () => {
    it('renders dark mode', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass('dark:bg-neutral-900');
    });

    it('renders light mode', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass('bg-neutral-200');
    });

    it('renders dark mode hover', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass('dark:hover:shadow-neutral-900');
    });

    it('renders light mode hover', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass('hover:shadow-neutral-400');
    });

    it('renders dark mode text', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(
        'dark:[&>div:nth-child(2)>span:nth-child(1)]:hover:text-primary-dark'
      );
    });

    it('renders light mode text', () => {
      render(<AlbumCard data={mockData} />);
      const card = screen.getByTestId('album-card');
      expect(card).toHaveClass(
        '[&>div:nth-child(2)>span:nth-child(1)]:hover:text-primary'
      );
    });
  });

  describe('Edge Cases', () => {
    it('renders TBA if release date is not available', () => {
      const data = { ...mockData, release_date: undefined };
      render(<AlbumCard data={data} />);
      const releaseDate = screen.getByText('TBA');
      expect(releaseDate).toBeInTheDocument();
    });
  });
});
