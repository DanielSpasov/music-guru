import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { defaultArtist } from '../../../Pages/artists/details';
import List from '.';

describe('List', () => {
  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(<List fetchFn={vi.fn()} model="albums" />);
      const element = screen.getByTestId('list');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    test('renders filters if filtersConfig is provided', () => {
      render(
        <List
          fetchFn={vi.fn()}
          model="albums"
          filtersConfig={[{ key: 'test-filter', label: 'Test Filter' }]}
        />
      );
      const element = screen.queryByTestId('list-filters');
      expect(element).toBeInTheDocument();
    });

    test("doesn't render filters if filtersConfig is not provided", () => {
      render(<List fetchFn={vi.fn()} model="albums" />);
      const element = screen.queryByTestId('list-filters');
      expect(element).not.toBeInTheDocument();
    });

    test('renders default number of loading cards if no skeletonLength is provided', () => {
      render(<List fetchFn={vi.fn()} model="albums" />);
      const element = screen.getByTestId('list-content');
      expect(element.children.length).toEqual(18);
    });

    test('renders a number of loading cards if skeletonLength is provided', () => {
      const skeletonLength = 9;
      render(
        <List
          fetchFn={vi.fn()}
          model="albums"
          skeletonLength={skeletonLength}
        />
      );
      const element = screen.getByTestId('list-content');
      expect(element.children.length).toEqual(skeletonLength);
    });

    test('calls fetchFn exactly 1 time', async () => {
      const fetchFn = vi.fn();
      render(<List fetchFn={fetchFn} model="albums" />);

      await waitFor(() => {
        const skeleton = screen.queryByTestId('album-card-skeleton');
        expect(skeleton).not.toBeInTheDocument();
      });

      expect(fetchFn).toBeCalledTimes(1);
    });
  });

  describe('Loading state', () => {
    test('renders skeleton cards if loading is true', () => {
      render(<List fetchFn={vi.fn()} model="songs" />);
      const elements = screen.queryAllByTestId('song-card-skeleton');
      expect(elements.length).toEqual(18);
    });

    test('renders no items message if the fetched data is an empty array', async () => {
      const fetchFn = vi.fn().mockResolvedValue({ data: [] });
      render(<List fetchFn={fetchFn} model="songs" />);

      await waitFor(() => {
        const element = screen.queryByTestId('song-card-skeleton');
        expect(element).not.toBeInTheDocument();
      });

      const noItemsEl = screen.queryByTestId('list-no-items-message');
      expect(noItemsEl).toBeInTheDocument();
    });

    test('renders items when the data is fetched', async () => {
      const fetchFn = vi.fn().mockResolvedValue({ data: [defaultArtist] });
      render(
        <MemoryRouter>
          <List fetchFn={fetchFn} model="artists" />
        </MemoryRouter>
      );

      await waitFor(() => {
        const element = screen.queryByTestId('artist-card-skeleton');
        expect(element).not.toBeInTheDocument();
      });

      const cardEl = screen.queryByTestId('artist-card');
      expect(cardEl).toBeInTheDocument();
    });
  });
});
