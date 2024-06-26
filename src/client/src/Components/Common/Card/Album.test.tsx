import { render, screen } from '@testing-library/react';

import AlbumCard, {
  darkProps,
  lightProps,
  darkHoverProps,
  lightHoverProps,
  darkHoverTextProps,
  lightHoverTextProps
} from './Album';

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
        mockData.release_date.getFullYear().toString()
      );
    });

    it('renders correct type', () => {
      render(<AlbumCard data={mockData} />);
      const type = screen.getByTestId('album-card-type');
      expect(type.textContent).toEqual(mockData.type.name);
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

  describe('Edge Cases', () => {
    it('renders TBA if release date is not available', () => {
      const data = { ...mockData, release_date: undefined };
      render(<AlbumCard data={data} />);
      const releaseDate = screen.getByTestId('album-card-release-date');
      expect(releaseDate.textContent).toEqual('TBA');
    });
  });
});
