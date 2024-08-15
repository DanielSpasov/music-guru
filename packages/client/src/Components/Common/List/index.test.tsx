import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { defaultArtist } from '../../../Pages/artists/details';
import List from '.';

describe('List', () => {
  test('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <List fetchFn={vi.fn()} model="albums" />
      </MemoryRouter>
    );

    const listEl = screen.getByTestId('list');
    expect(listEl).toBeInTheDocument();

    const searchEl = screen.getByTestId('list-search');
    expect(searchEl).toBeInTheDocument();

    const contentEl = screen.getByTestId('list-content');
    expect(contentEl.children.length).toEqual(18);
  });

  test('renders a number of loading cards if skeletonLength is provided', async () => {
    const skeletonLength = 9;
    render(
      <MemoryRouter>
        <List
          fetchFn={vi.fn()}
          model="albums"
          skeletonLength={skeletonLength}
        />
      </MemoryRouter>
    );

    const element = screen.getByTestId('list-content');
    expect(element.children.length).toEqual(skeletonLength);
  });

  test('calls fetchFn exactly 1 time', async () => {
    const fetchFn = vi.fn();
    await act(async () => {
      render(
        <MemoryRouter>
          <List fetchFn={fetchFn} model="albums" />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const skeleton = screen.queryByTestId('album-card-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    expect(fetchFn).toBeCalledTimes(1);
  });

  test("doesn't render search input if hideSearch is true", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <List fetchFn={vi.fn()} model="albums" hideSearch />
        </MemoryRouter>
      );
    });

    const searchEl = screen.queryByTestId('list-search');
    expect(searchEl).not.toBeInTheDocument();
  });

  test('renders custom search placeholder', async () => {
    const searchPlaceholder = 'testSearchPlaceholder';
    await act(async () => {
      render(
        <MemoryRouter>
          <List
            fetchFn={vi.fn()}
            model="albums"
            searchPlaceholder={searchPlaceholder}
          />
        </MemoryRouter>
      );
    });

    const searchEl = screen.getByTestId('list-search-input');
    expect(searchEl).toHaveAttribute('placeholder', searchPlaceholder);
  });

  test('calls fetchFn with correct search value', async () => {
    const fetchFn = vi.fn();
    await act(async () => {
      render(
        <MemoryRouter>
          <List fetchFn={fetchFn} model="albums" />
        </MemoryRouter>
      );
    });

    const value = 'testsearch';

    const searchEl = screen.getByTestId('list-search-input');
    expect(searchEl).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(searchEl, { target: { value } });
    });

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledWith({ params: { name: value } });
    });
  });

  test('calls fetchFn with custom search key', async () => {
    const fetchFn = vi.fn();
    const searchKey = 'testSearchKey';
    const value = 'testsearch';
    await act(async () => {
      render(
        <MemoryRouter>
          <List fetchFn={fetchFn} model="albums" searchKey={searchKey} />
        </MemoryRouter>
      );
    });

    const searchEl = screen.getByTestId('list-search-input');
    expect(searchEl).toBeInTheDocument();
    fireEvent.change(searchEl, { target: { value } });

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledWith({
        params: { [searchKey]: value }
      });
    });
  });

  test('renders no items message if the fetched data is an empty array', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ data: [] });
    await act(async () => {
      render(
        <MemoryRouter>
          <List fetchFn={fetchFn} model="songs" />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const element = screen.queryByTestId('song-card-skeleton');
      expect(element).not.toBeInTheDocument();
    });

    const noItemsEl = screen.queryByTestId('list-no-items-message');
    expect(noItemsEl).toBeInTheDocument();
  });

  test('renders items when the data is fetched', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ data: [defaultArtist] });
    await act(async () => {
      render(
        <MemoryRouter>
          <List fetchFn={fetchFn} model="artists" />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const element = screen.queryByTestId('artist-card-skeleton');
      expect(element).not.toBeInTheDocument();
    });

    const cardEl = screen.queryByTestId('artist-card');
    expect(cardEl).toBeInTheDocument();
  });
});
