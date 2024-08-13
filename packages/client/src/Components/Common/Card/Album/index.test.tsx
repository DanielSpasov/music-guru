import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';

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

  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AlbumCard data={mockData} />
      </MemoryRouter>
    );

    const card = screen.getByTestId('album-card');
    expect(card).toBeInTheDocument();

    const name = screen.getByTestId('album-card-name');
    expect(name.textContent).toEqual(mockData.name);

    const image = screen.getByTestId('album-card-image');
    expect(image).toHaveAttribute('src', mockData.image);

    const releaseDate = screen.getByTestId('album-card-release-date');
    expect(releaseDate.textContent).toEqual(
      moment(mockData?.release_date).year().toString()
    );

    const type = screen.getByTestId('album-card-type');
    expect(type.textContent).toEqual(mockData.type.name);
  });

  test('renders skeleton when loading', () => {
    render(
      <MemoryRouter>
        <AlbumCard data={mockData} loading />
      </MemoryRouter>
    );

    const skeletonCard = screen.getByTestId('album-card-skeleton');
    expect(skeletonCard).toBeInTheDocument();

    const card = screen.queryByTestId('album-card');
    expect(card).not.toBeInTheDocument();
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
});
