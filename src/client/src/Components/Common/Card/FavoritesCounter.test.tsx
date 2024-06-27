import { fireEvent, render, screen } from '@testing-library/react';

import FavoritesCounter, { FavoritesCounterProps } from './FavoritesConuter';

describe('Favorites Counter', () => {
  describe('Rendering', () => {
    test('renders without crashing', () => {
      const model = 'artists';
      render(
        <FavoritesCounter
          defaultCount={0}
          defaultIsFav={false}
          model={model}
          uid="test123"
          canFavorite
          favoriteFn={vi.fn()}
        />
      );
      const element = screen.getByTestId(`${model}-favorites-counter`);
      expect(element).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    const props: FavoritesCounterProps = {
      defaultCount: 0,
      defaultIsFav: false,
      model: 'artists',
      uid: 'test123',
      canFavorite: true
    };

    test('renders correct default favorites count', () => {
      render(<FavoritesCounter {...props} />);
      const element = screen.getByTestId(`${props.model}-card-favorites-count`);
      expect(Number(element.textContent)).toEqual(props.defaultCount);
    });

    test('renders heart if the default favorite is true', () => {
      render(<FavoritesCounter {...props} defaultIsFav />);
      const element = screen.getByTestId(`${props.model}-card-heart-svg`);
      expect(element).toBeInTheDocument();
    });

    test('renders heart outline if the default favorite is true', () => {
      render(<FavoritesCounter {...props} />);
      const element = screen.getByTestId(
        `${props.model}-card-heart-outline-svg`
      );
      expect(element).toBeInTheDocument();
    });

    test('calls favoriteFn when heart icon is clicked', () => {
      const favoriteFn = vi.fn();
      render(
        <FavoritesCounter {...props} defaultIsFav favoriteFn={favoriteFn} />
      );
      const element = screen.getByTestId(`${props.model}-card-heart-svg`);
      fireEvent.click(element);
      expect(favoriteFn).toBeCalled();
    });

    test('calls favoriteFn when heart outline icon is clicked', () => {
      const favoriteFn = vi.fn();
      render(<FavoritesCounter {...props} favoriteFn={favoriteFn} />);
      const element = screen.getByTestId(
        `${props.model}-card-heart-outline-svg`
      );
      fireEvent.click(element);
      expect(favoriteFn).toBeCalled();
    });

    test("doesn't call favoriteFn when heart icon is clicked if canFavorite is false", () => {
      const favoriteFn = vi.fn();
      render(
        <FavoritesCounter
          defaultCount={0}
          model="artists"
          uid="test"
          defaultIsFav
          canFavorite={false}
          favoriteFn={favoriteFn}
        />
      );
      const element = screen.getByTestId(`${props.model}-card-heart-svg`);
      fireEvent.click(element);
      expect(favoriteFn).not.toBeCalled();
    });

    test("doesn't call favoriteFn when heart outline icon is clicked if canFavorite is false", () => {
      const favoriteFn = vi.fn();
      render(
        <FavoritesCounter
          defaultCount={0}
          model="artists"
          uid="test"
          defaultIsFav={false}
          canFavorite={false}
          favoriteFn={favoriteFn}
        />
      );
      const element = screen.getByTestId(
        `${props.model}-card-heart-outline-svg`
      );
      fireEvent.click(element);
      expect(favoriteFn).not.toBeCalled();
    });
  });
});
