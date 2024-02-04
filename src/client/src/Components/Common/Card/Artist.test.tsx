import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ArtistCard from './Artist';

describe('Artist Card', () => {
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

  describe('Business Logic', () => {
    it('renders without crashing', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toBeInTheDocument();
    });

    it('renders skeleton when loading', () => {
      render(<ArtistCard data={mockData} loading />);
      const card = screen.getByTestId('artist-card-skeleton');
      expect(card).toBeInTheDocument();
    });

    it('renders correct name', () => {
      render(<ArtistCard data={mockData} />);
      const name = screen.getByText(mockData.name);
      expect(name).toBeInTheDocument();
    });

    it('renders correct image', () => {
      render(<ArtistCard data={mockData} />);
      const image = screen.getByAltText(mockData.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockData.image);
    });

    it('calls onClick when clicked', () => {
      let clickCounter = 0;
      const onClick = () => {
        clickCounter++;
      };
      render(<ArtistCard data={mockData} onClick={onClick} />);
      const card = screen.getByTestId('artist-card');
      card.click();
      expect(clickCounter).toBe(1);
    });
  });

  describe('CSS', () => {
    it('renders dark mode', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toHaveClass('dark:bg-neutral-900');
    });

    it('renders light mode', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toHaveClass('bg-neutral-200');
    });

    it('renders dark mode hover', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toHaveClass('dark:hover:shadow-neutral-900');
    });

    it('renders light mode hover', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toHaveClass('hover:shadow-neutral-400');
    });

    it('renders dark mode text', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toHaveClass('dark:[&>span]:hover:text-primary-dark');
    });

    it('renders light mode text', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toHaveClass('[&>span]:hover:text-primary');
    });
  });
});
