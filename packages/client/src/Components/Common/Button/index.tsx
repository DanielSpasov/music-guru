import { FC } from 'react';

import { ButtonProps } from './types';

import css from './Button.module.css';

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...HTMLButtonProps
}) => {
  return (
    <button
      className={`${css.btn} ${css[variant]} ${className}`}
      data-testid={HTMLButtonProps['data-testid'] ?? 'button'}
      {...HTMLButtonProps}
    >
      {children}
    </button>
  );
};

export default Button;
