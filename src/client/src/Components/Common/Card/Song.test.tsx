import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SongCard from './Song';

describe('Song Card', () => {
  const mockData = {
    name: 'Test Song Name',
    uid: 'test-song-uuid',
    image: 'http://test123',
    created_at: new Date(),
    created_by: 'test-user-uuid',
    artist: 'Test Artist Name',
    features: []
  };

  describe('Business Logic', () => {
    it('renders without crashing', () => {
      render(<SongCard data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toBeInTheDocument();
    });

    it('renders skeleton when loading', () => {
      render(<SongCard data={mockData} loading />);
      const card = screen.getByTestId('song-card-skeleton');
      expect(card).toBeInTheDocument();
    });

    it('renders correct name', () => {
      render(<SongCard data={mockData} />);
      const name = screen.getByText(mockData.name);
      expect(name).toBeInTheDocument();
    });

    it('renders correct image', () => {
      render(<SongCard data={mockData} />);
      const image = screen.getByAltText(mockData.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockData.image);
    });

    it('renders correct artist', () => {
      render(<SongCard data={mockData} />);
      const artist = screen.getByText(mockData.artist);
      expect(artist).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
      let clickCounter = 0;
      const onClick = () => {
        clickCounter++;
      };
      render(<SongCard data={mockData} onClick={onClick} />);
      const card = screen.getByTestId('song-card');
      card.click();
      expect(clickCounter).toBe(1);
    });
  });

  describe('CSS', () => {
    it('renders dark mode', () => {
      render(<SongCard data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass('dark:bg-neutral-900');
    });

    it('renders light mode', () => {
      render(<SongCard data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass('bg-neutral-200');
    });

    it('renders dark mode hover', () => {
      render(<SongCard data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass('dark:hover:shadow-neutral-900');
    });

    it('renders light mode hover', () => {
      render(<SongCard data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass('hover:shadow-neutral-400');
    });

    it('renders dark mode text', () => {
      render(<SongCard data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass(
        'dark:[&>div>span:nth-child(1)]:hover:text-primary-dark'
      );
    });

    it('renders light mode text', () => {
      render(<SongCard data={mockData} />);
      const card = screen.getByTestId('song-card');
      expect(card).toHaveClass('[&>div>span:nth-child(1)]:hover:text-primary');
    });
  });

  describe('Edge Cases', () => {
    it('renders default image', () => {
      render(<SongCard data={{ ...mockData, image: undefined }} />);
      const image = screen.getByAltText(mockData.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        'src',
        '/images/logo/blue-logo-square512.png'
      );
    });
  });
});
