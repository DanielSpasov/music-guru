import { act, fireEvent, render, screen } from '@testing-library/react';

import Details from '.';

describe('Details', () => {
  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(<Details label="Test Label" />);
      const element = screen.getByTestId('details');
      expect(element).toBeInTheDocument();
    });

    test('renders children without crashing', () => {
      render(
        <Details label="Test Label" open>
          <span>test123</span>
        </Details>
      );
      const element = screen.getByTestId('details-content');
      expect(element).toContainHTML('<span>test123</span>');
    });
  });

  describe('Component props', () => {
    test('renders correct label', () => {
      render(<Details label="Test Label" />);
      const element = screen.getByTestId('details-summary');
      expect(element.textContent).toEqual('Test Label');
    });

    test('renders up icon if open is true', () => {
      render(<Details label="Test Label" open />);
      const element = screen.getByTestId('details-up-icon');
      expect(element).toBeInTheDocument();
    });

    test('renders up icon if open is false', () => {
      render(<Details label="Test Label" />);
      const element = screen.getByTestId('details-down-icon');
      expect(element).toBeInTheDocument();
    });

    test("doesn't render children if open is false", () => {
      render(
        <Details label="Test Label">
          <span>test123</span>
        </Details>
      );
      const element = screen.getByTestId('details-content');
      expect(element.children.length).toEqual(0);
    });
  });

  describe('Show/Hide logic', () => {
    test('hides details content when clicking the summary when its open', async () => {
      render(
        <Details label="Test Label" open>
          <span>test123</span>
        </Details>
      );

      const summaryEl = screen.getByTestId('details-summary');
      await act(async () => fireEvent.click(summaryEl));

      const element = screen.getByTestId('details-content');
      expect(element.children.length).toEqual(0);
    });

    test('shows details content when clicking the summary when its hidden', async () => {
      render(
        <Details label="Test Label">
          <span>test123</span>
        </Details>
      );

      const summaryEl = screen.getByTestId('details-summary');
      await act(async () => fireEvent.click(summaryEl));

      const element = screen.getByTestId('details-content');
      expect(element.children.length).toEqual(1);
    });
  });
});
