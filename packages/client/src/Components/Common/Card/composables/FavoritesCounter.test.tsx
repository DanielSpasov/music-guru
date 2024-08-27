import { fireEvent, render, screen } from '@testing-library/react';
import { MockedFunction } from 'vitest';

import { UseFavoriteHookProps } from '../../../../Hooks/useFavorite/types';
import FavoritesCounter from './FavoritesConuter';
import { useFavorite } from '../../../../Hooks';

vi.mock('../../../../Hooks/useFavorite', () => ({
  useFavorite: vi.fn()
}));

describe('Favorites Counter', () => {
  const mockUseFavorite = useFavorite as MockedFunction<typeof useFavorite>;

  const props: UseFavoriteHookProps = {
    defaultCount: 0,
    model: 'artists',
    uid: 'test-artist-123'
  };

  test('renders without crashing', () => {
    mockUseFavorite.mockReturnValue({
      count: 0,
      loading: false,
      canFavorite: true,
      favorite: vi.fn(),
      isFavorite: true
    });

    render(<FavoritesCounter {...props} />);

    const wrapperEl = screen.getByTestId(`${props.model}-favorites-counter`);
    expect(wrapperEl).toBeInTheDocument();

    const counterEl = screen.getByTestId(`${props.model}-card-favorites-count`);
    expect(Number(counterEl.textContent)).toEqual(props.defaultCount);

    const heartEl = screen.getByTestId(`${props.model}-card-heart-svg`);
    expect(heartEl).toBeInTheDocument();
    const heartOutlineEl = screen.queryByTestId(
      `${props.model}-card-heart-outline-svg`
    );
    expect(heartOutlineEl).not.toBeInTheDocument();
  });

  test('calls favorite when clicking the heart icon', () => {
    const favoriteFn = vi.fn();
    mockUseFavorite.mockReturnValue({
      count: 0,
      loading: false,
      canFavorite: true,
      favorite: favoriteFn,
      isFavorite: true
    });

    render(<FavoritesCounter {...props} />);

    const wrapperEl = screen.getByTestId(`${props.model}-favorites-counter`);
    expect(wrapperEl).toBeInTheDocument();

    const heartEl = screen.getByTestId(`${props.model}-card-heart-svg`);
    expect(heartEl).toBeInTheDocument();
    fireEvent.click(heartEl);
    expect(favoriteFn).toHaveBeenCalledOnce();
  });

  test('calls favorite when clicking the heart-outline icon', () => {
    const favoriteFn = vi.fn();
    mockUseFavorite.mockReturnValue({
      count: 0,
      loading: false,
      canFavorite: true,
      favorite: favoriteFn,
      isFavorite: false
    });

    render(<FavoritesCounter {...props} />);

    const wrapperEl = screen.getByTestId(`${props.model}-favorites-counter`);
    expect(wrapperEl).toBeInTheDocument();

    const heartOutlineEl = screen.getByTestId(
      `${props.model}-card-heart-outline-svg`
    );
    expect(heartOutlineEl).toBeInTheDocument();
    fireEvent.click(heartOutlineEl);
    expect(favoriteFn).toHaveBeenCalledOnce();
  });

  test('disables heart icon when loading', () => {
    const favoriteFn = vi.fn();
    mockUseFavorite.mockReturnValue({
      count: 0,
      loading: true,
      canFavorite: true,
      favorite: favoriteFn,
      isFavorite: true
    });

    render(<FavoritesCounter {...props} />);

    const wrapperEl = screen.getByTestId(`${props.model}-favorites-counter`);
    expect(wrapperEl).toBeInTheDocument();

    const heartEl = screen.getByTestId(`${props.model}-card-heart-svg`);
    expect(heartEl).toBeInTheDocument();
    fireEvent.click(heartEl);
    expect(favoriteFn).not.toHaveBeenCalled();
  });

  test('disables heart-outline icon when loading', () => {
    const favoriteFn = vi.fn();
    mockUseFavorite.mockReturnValue({
      count: 0,
      loading: true,
      canFavorite: true,
      favorite: favoriteFn,
      isFavorite: false
    });

    render(<FavoritesCounter {...props} />);

    const wrapperEl = screen.getByTestId(`${props.model}-favorites-counter`);
    expect(wrapperEl).toBeInTheDocument();

    const heartOutlineEl = screen.getByTestId(
      `${props.model}-card-heart-outline-svg`
    );
    expect(heartOutlineEl).toBeInTheDocument();
    fireEvent.click(heartOutlineEl);
    expect(favoriteFn).not.toHaveBeenCalled();
  });
});
