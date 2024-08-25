import { createPortal } from 'react-dom';
import { FC, memo } from 'react';

import { ModalProps } from './types';
import { IX } from '../..';

import css from './index.module.css';

const Modal: FC<ModalProps> = ({
  children,
  title,
  open,
  setOpen,
  closeOnOutsideClick = true
}) => {
  if (!open) return null;
  return createPortal(
    <article className={css.wrapper} data-testid="modal">
      <div
        className={css.background}
        data-testid="modal-background"
        onClick={() => (closeOnOutsideClick ? setOpen(false) : () => null)}
      />

      <section className={css.contentWrapper}>
        <div className={css.header}>
          <h2 data-testid="modal-title">{title}</h2>
          <IX data-testid="modal-close-button" onClick={() => setOpen(false)} />
        </div>

        <article className={css.content} data-testid="modal-content">
          {children}
        </article>
      </section>
    </article>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default memo(Modal);
