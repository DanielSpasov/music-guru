import { screen, render } from '@testing-library/react';

import { vinyl, onPlayerProps, spinner } from './styles';
import Loader from '.';

describe('Loader', () => {
  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(<Loader />);
      const element = screen.getByTestId('loader-spinner');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Type', () => {
    describe('Player', () => {
      test('renders loader with type player', () => {
        render(<Loader type="player" />);
        const element = screen.getByTestId('loader-player');
        expect(element).toBeInTheDocument();
      });

      test('renders player with custom color', () => {
        const color = 'bg-green-500';
        render(<Loader type="player" color={color} />);
        const element = screen.getByTestId('loader-player');
        expect(element).toHaveClass(color);
      });
    });

    describe('Vinyl', () => {
      test('renders loader with type vinyl', () => {
        render(<Loader type="vinyl" />);
        const element = screen.getByTestId('loader-vinyl');
        expect(element).toBeInTheDocument();
      });

      test('renders loader with correct onPlayer props', () => {
        render(<Loader type="vinyl" onPlayer />);
        const element = screen.getByTestId('loader-vinyl');
        expect(element).toHaveClass(onPlayerProps);
      });

      test('renders loader with custom color', () => {
        const color = 'bg-blue-500';
        render(<Loader type="vinyl" color={color} />);
        const element = screen.getByTestId('loader-vinyl-record-label');
        expect(element).toHaveClass(color);
      });

      test('renders loader with correct sm size props', () => {
        const size = 'sm';
        render(<Loader type="vinyl" size={size} />);

        const recordEl = screen.getByTestId('loader-vinyl');
        const recordLabelEl = screen.getByTestId('loader-vinyl-record-label');
        const centerHoleEl = screen.getByTestId('loader-vinyl-center-hole');
        const outterStripeEl = screen.getByTestId('loader-vinyl-outter-stripe');
        const innerStripeEl = screen.getByTestId('loader-vinyl-inner-stripe');

        expect(recordEl).toHaveClass(vinyl[size].record);
        expect(recordLabelEl).toHaveClass(vinyl[size].recordLabel);
        expect(centerHoleEl).toHaveClass(vinyl[size].centerHole);
        expect(outterStripeEl).toHaveClass(vinyl[size].outterStripe);
        expect(innerStripeEl).toHaveClass(vinyl[size].innerStripe);
      });

      test('renders loader with correct lg size props', () => {
        const size = 'lg';

        render(<Loader type="vinyl" size={size} />);

        const recordEl = screen.getByTestId('loader-vinyl');
        const recordLabelEl = screen.getByTestId('loader-vinyl-record-label');
        const centerHoleEl = screen.getByTestId('loader-vinyl-center-hole');
        const outterStripeEl = screen.getByTestId('loader-vinyl-outter-stripe');
        const innerStripeEl = screen.getByTestId('loader-vinyl-inner-stripe');

        expect(recordEl).toHaveClass(vinyl[size].record);
        expect(recordLabelEl).toHaveClass(vinyl[size].recordLabel);
        expect(centerHoleEl).toHaveClass(vinyl[size].centerHole);
        expect(outterStripeEl).toHaveClass(vinyl[size].outterStripe);
        expect(innerStripeEl).toHaveClass(vinyl[size].innerStripe);
      });
    });

    describe('Spinner', () => {
      test('renders loader with type spinner', () => {
        render(<Loader type="spinner" />);
        const element = screen.getByTestId('loader-spinner');
        expect(element).toBeInTheDocument();
      });

      test('renders spinner correct sm size props', () => {
        const size = 'sm';
        render(<Loader type="spinner" size={size} />);
        const element = screen.getByTestId('loader-spinner');
        expect(element).toHaveClass(spinner[size]);
      });

      test('renders spinner correct lg size props', () => {
        const size = 'lg';
        render(<Loader type="spinner" size={size} />);
        const element = screen.getByTestId('loader-spinner');
        expect(element).toHaveClass(spinner[size]);
      });
    });
  });
});
