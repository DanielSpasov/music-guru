import { FC } from 'react';
import { ButtonProps } from './types';
import { variants } from './variants';

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...HTMLButtonProps
}) => {
  return (
    <button
      className={`${variants[variant]} ${className}`}
      data-testid="button"
      {...HTMLButtonProps}
    >
      {children}
    </button>
  );
};

export default Button;
