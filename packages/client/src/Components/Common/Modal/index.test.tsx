import { screen, render, fireEvent } from '@testing-library/react';

import Modal from '.';

describe('Modal', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  test('renders without crashing', () => {
    const title = 'test title';
    const setOpen = vi.fn();
    render(
      <Modal open={true} setOpen={setOpen} title={title}>
        <div>test</div>
      </Modal>
    );

    const modalEl = screen.getByTestId('modal');
    expect(modalEl).toBeInTheDocument();

    const backgroundEl = screen.getByTestId('modal-background');
    expect(backgroundEl).toBeInTheDocument();
    fireEvent.click(backgroundEl);
    expect(setOpen).toHaveBeenCalledTimes(1);

    const titleEl = screen.getByTestId('modal-title');
    expect(titleEl).toBeInTheDocument();
    expect(titleEl.textContent).toEqual(title);

    const closeButtonEl = screen.getByTestId('modal-close-button');
    expect(closeButtonEl).toBeInTheDocument();
    fireEvent.click(closeButtonEl);
    expect(setOpen).toHaveBeenCalledTimes(2);

    const contentEl = screen.getByTestId('modal-content');
    expect(contentEl).toContainHTML('<div>test</div>');
  });

  test("doesn't render if open is false", () => {
    render(
      <Modal open={false} setOpen={vi.fn()}>
        <div>test</div>
      </Modal>
    );

    const modalEl = screen.queryByTestId('modal');
    expect(modalEl).not.toBeInTheDocument();
  });

  test("doesn't call setOpen when background is click if closeOnOutsideClick is false", () => {
    const setOpen = vi.fn();
    render(
      <Modal open={true} setOpen={setOpen} closeOnOutsideClick={false}>
        <div>test</div>
      </Modal>
    );

    const modalEl = screen.getByTestId('modal');
    expect(modalEl).toBeInTheDocument();

    const backgroundEl = screen.getByTestId('modal-background');
    expect(backgroundEl).toBeInTheDocument();
    fireEvent.click(backgroundEl);
    expect(setOpen).not.toHaveBeenCalled();
  });
});
