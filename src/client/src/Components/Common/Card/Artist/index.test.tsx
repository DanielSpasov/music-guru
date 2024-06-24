import { render, screen } from '@testing-library/react';

import { darkHoverProps, lightHoverProps } from './helpers';
import { ListArtist } from '../../../../Types/Artist';
import ArtistCard from '.';

describe('Artist Card', () => {
  const mockData: ListArtist = {
    name: 'Test Artist Name',
    uid: 'test-artist-uuid',
    image: 'http://test123',
    favorites: 0
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    it('renders skeleton when loading', () => {
      render(<ArtistCard data={mockData} loading />);
      const card = screen.getByTestId('artist-card-skeleton');
      expect(card).toBeInTheDocument();
    });

    it('renders correct name', () => {
      render(<ArtistCard data={mockData} />);
      const name = screen.getByTestId('artist-card-name');
      expect(name.textContent).toEqual(mockData.name);
    });

    it('renders correct image', () => {
      render(<ArtistCard data={mockData} />);
      const image = screen.getByTestId('artist-card-image');
      expect(image).toHaveAttribute('src', mockData.image);
    });

    it('renders correct favorites count', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card-favorites');
      expect(Number(card.textContent)).toBe(mockData.favorites);
    });

    it('calls onClick when clicked', () => {
      const onClick = vi.fn();
      render(<ArtistCard data={mockData} onClick={onClick} />);
      const card = screen.getByTestId('artist-card');
      card.click();
      expect(onClick).toBeCalled();
    });
  });

  describe('CSS', () => {
    it('renders dark mode hover', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toHaveClass(darkHoverProps);
    });

    it('renders light mode hover', () => {
      render(<ArtistCard data={mockData} />);
      const card = screen.getByTestId('artist-card');
      expect(card).toHaveClass(lightHoverProps);
    });
  });
});
