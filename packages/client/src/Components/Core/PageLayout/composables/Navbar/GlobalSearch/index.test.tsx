import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Mock } from 'vitest';

import Api from '../../../../../../Api';
import Search from '.';

vi.mock('../../../../../../Api');

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Search models={['albums']} />);

    const element = screen.getByTestId('navbar-search');
    expect(element).toBeInTheDocument();

    const resultsEl = screen.queryByTestId('navbar-search-results');
    expect(resultsEl).not.toBeInTheDocument();
  });

  test('renders loader while fetching', async () => {
    render(<Search models={['albums']} />);

    const inputEl = screen.getByTestId('search-input');
    fireEvent.change(inputEl, { target: { value: 'test' } });

    await waitFor(() => {
      const loaderEl = screen.getByTestId('navbar-search-loader');
      expect(loaderEl).toBeInTheDocument();
    });
  });

  test('renders "No Results." when no results are found', async () => {
    const search = 'Search';

    (Api.artists.fetch as Mock).mockResolvedValueOnce({ data: [] });

    render(<Search models={['artists']} />);

    const inputEl = screen.getByTestId('search-input');
    fireEvent.change(inputEl, { target: { value: search } });

    await waitFor(() =>
      expect(Api.artists.fetch).toHaveBeenCalledWith({
        config: { params: { name: search, limit: 5 } }
      })
    );

    const noResultsEl = screen.getByTestId('navbar-search-no-results');
    expect(noResultsEl).toBeInTheDocument();
  });

  test('renders search results', async () => {
    const search = 'Test';

    (Api.artists.fetch as Mock).mockResolvedValueOnce({
      data: [{ uid: '1', name: 'Artist 1' }]
    });

    render(
      <MemoryRouter>
        <Search models={['artists']} />
      </MemoryRouter>
    );

    const inputEl = screen.getByTestId('search-input');
    fireEvent.change(inputEl, { target: { value: search } });

    await waitFor(() =>
      expect(Api.artists.fetch).toHaveBeenCalledWith({
        config: { params: { name: search, limit: 5 } }
      })
    );

    await waitFor(() => {
      const loaderEl = screen.queryByTestId('navbar-search-loader');
      expect(loaderEl).not.toBeInTheDocument();
      const noResultsEl = screen.queryByTestId('navbar-search-no-results');
      expect(noResultsEl).not.toBeInTheDocument();
    });

    const artistsEl = screen.queryByTestId('results-artists');
    expect(artistsEl).toBeInTheDocument();

    const artistLinkEl = screen.getByTestId('results-artists-1');
    expect(artistLinkEl).toBeInTheDocument();
    fireEvent.click(artistLinkEl);

    const artistLinkArtistEl = screen.queryByTestId('results-artists-1-artist');
    expect(artistLinkArtistEl).not.toBeInTheDocument();

    await waitFor(() => {
      const resultsEl = screen.queryByTestId('navbar-search-results');
      expect(resultsEl).not.toBeInTheDocument();
    });
  });

  test('renders search results with artist links', async () => {
    const search = 'Test';

    (Api.albums.fetch as Mock).mockResolvedValueOnce({
      data: [
        { uid: '1', name: 'Album 1', artist: { name: 'Test', uid: '1234' } }
      ]
    });

    render(
      <MemoryRouter>
        <Search models={['albums']} />
      </MemoryRouter>
    );

    const inputEl = screen.getByTestId('search-input');
    fireEvent.change(inputEl, { target: { value: search } });

    await waitFor(() =>
      expect(Api.albums.fetch).toHaveBeenCalledWith({
        config: { params: { name: search, limit: 5 } }
      })
    );

    await waitFor(() => {
      const loaderEl = screen.queryByTestId('navbar-search-loader');
      expect(loaderEl).not.toBeInTheDocument();
      const noResultsEl = screen.queryByTestId('navbar-search-no-results');
      expect(noResultsEl).not.toBeInTheDocument();
    });

    const albumsEl = screen.queryByTestId('results-albums');
    expect(albumsEl).toBeInTheDocument();

    const albumLinkEl = screen.getByTestId('results-albums-1');
    expect(albumLinkEl).toBeInTheDocument();

    const albumLinkArtistEl = screen.getByTestId('results-albums-1-artist');
    expect(albumLinkArtistEl).toBeInTheDocument();
    expect(albumLinkArtistEl.textContent).toEqual('Test');

    fireEvent.click(albumLinkEl);
    await waitFor(() => {
      const resultsEl = screen.queryByTestId('navbar-search-results');
      expect(resultsEl).not.toBeInTheDocument();
    });
  });
});
