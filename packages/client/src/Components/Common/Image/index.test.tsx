import { act, fireEvent, render, screen } from '@testing-library/react';

import Image from '.';

describe('Image', () => {
  test('renders Image without crashing', () => {
    const src = 'https://example.com/image.jpg';
    render(<Image src={src} />);
    const imageElement = screen.getByTestId('image');
    expect(imageElement).toBeInTheDocument();
  });

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
    expect(imageElement.parentElement).toHaveClass(className);
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
