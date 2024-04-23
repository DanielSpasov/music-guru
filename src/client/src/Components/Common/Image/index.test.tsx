import { fireEvent, render, screen } from '@testing-library/react';

import Image, { lightImgProps, darkImgProps, hoverProps } from './index';

describe('Image', () => {
  describe('Basic props', () => {
    test('renders Image with default props', () => {
      const src = 'https://example.com/image.jpg';
      render(<Image src={src} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', src);
    });

    test('renders Image with custom alt attribute', () => {
      const src = 'https://example.com/image.jpg';
      const alt = 'Example Image';
      render(<Image src={src} alt={alt} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('alt', alt);
    });

    test('renders Image with custom className attribute', () => {
      const src = 'https://example.com/image.jpg';
      const className = 'bg-neutral-50';
      render(<Image src={src} className={className} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveClass(className);
    });

    test('renders Image with custom size attribute', () => {
      const src = 'https://example.com/image.jpg';
      const size = 24;
      render(<Image src={src} size={size} />);
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveClass(
        `w-${size} h-${size} min-w-${size} min-h-${size}`
      );
    });

    test('calls updateFn when a file is uploaded', () => {
      const src = 'https://example.com/image.jpg';
      const file = new File(['image.jpg'], 'image.jpg', { type: 'image/jpeg' });

      let clickCounter = 0;
      const updateFn = async () => {
        clickCounter++;
      };

      render(<Image src={src} editable updateFn={updateFn} />);
      const inputField = screen.getByTestId('image-input');
      fireEvent.change(inputField, { target: { files: [file] } });
      expect(clickCounter).toBe(1);
    });

    test('does not call updateFn when editable is false', () => {
      const src = 'https://example.com/image.jpg';
      const file = new File(['image.jpg'], 'image.jpg', { type: 'image/jpeg' });

      let clickCounter = 0;
      const updateFn = async () => {
        clickCounter++;
      };

      render(<Image src={src} updateFn={updateFn} />);
      const inputField = screen.getByTestId('image-input');
      fireEvent.change(inputField, { target: { files: [file] } });
      expect(clickCounter).toBe(0);
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
