import { createPortal } from 'react-dom';
import { FC, memo } from 'react';

import { ModalProps } from './types';

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
    <article className={css.wrapper}>
      <div
        className={css.background}
        onClick={() => (closeOnOutsideClick ? setOpen(false) : () => null)}
      />

      <section className={css.contentWrapper}>
        <div className={css.header}>
          <h2>{title}</h2>
        </div>

        <article className={css.content}>{children}</article>
      </section>
    </article>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default memo(Modal);
