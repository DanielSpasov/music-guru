import { act, fireEvent, render, screen } from '@testing-library/react';

import { lightImgProps, darkImgProps, hoverProps } from './helpers';
import Image from '.';

describe('Image', () => {
  describe('Rendering', () => {
    test('renders Image without crashing', () => {
      const src = 'https://example.com/image.jpg';
      render(<Image src={src} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toBeInTheDocument();
    });
  });

  describe('Component props', () => {
    test('renders Image with correct src attribute', () => {
      const src = 'https://example.com/image.jpg';
      render(<Image src={src} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toHaveAttribute('src', src);
    });

    test('renders Image with custom alt attribute', () => {
      const src = 'https://example.com/image.jpg';
      const alt = 'Example Image';
      render(<Image src={src} alt={alt} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toHaveAttribute('alt', alt);
    });

    test('renders Image with custom className attribute', () => {
      const src = 'https://example.com/image.jpg';
      const className = 'bg-neutral-50';
      render(<Image src={src} className={className} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toHaveClass(className);
    });

    test('renders Image with custom size attribute', () => {
      const src = 'https://example.com/image.jpg';
      const size = 24;
      render(<Image src={src} size={size} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement.parentElement).toHaveClass(`w-${size} h-${size}`);
    });

    test('calls updateFn when a file is uploaded', async () => {
      const src = 'https://example.com/image.jpg';
      const file = new File(['image.jpg'], 'image.jpg', { type: 'image/jpeg' });
      const updateFn = vi.fn();
      render(<Image src={src} editable updateFn={updateFn} />);
      const inputField = screen.getByTestId('image-input');
      await act(async () =>
        fireEvent.change(inputField, { target: { files: [file] } })
      );
      expect(updateFn).toBeCalled();
    });

    test('does not call updateFn when editable is false', async () => {
      const src = 'https://example.com/image.jpg';
      const file = new File(['image.jpg'], 'image.jpg', { type: 'image/jpeg' });
      const updateFn = vi.fn();
      render(<Image src={src} updateFn={updateFn} />);
      const inputField = screen.getByTestId('image-input');
      await act(async () =>
        fireEvent.change(inputField, { target: { files: [file] } })
      );
      expect(updateFn).not.toBeCalled();
    });
  });

  describe('CSS', () => {
    test('renders Image with light theme props', () => {
      const src = 'https://example.com/image.jpg';
      render(<Image src={src} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toHaveClass(lightImgProps);
    });

    test('renders Image with dark theme props', () => {
      const src = 'https://example.com/image.jpg';
      render(<Image src={src} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toHaveClass(darkImgProps);
    });

    test('renders editable Image with hover props', () => {
      const src = 'https://example.com/image.jpg';
      render(<Image src={src} editable />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toHaveClass(hoverProps);
    });

    test('renders non editable Image without hover props', () => {
      const src = 'https://example.com/image.jpg';
      render(<Image src={src} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).not.toHaveClass(hoverProps);
    });
  });
});
