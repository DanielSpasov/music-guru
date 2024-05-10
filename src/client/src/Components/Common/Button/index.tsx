import { ButtonProps } from './types';
import { variants } from './variants';

export default function Button({
  children,
  variant = 'primary',
  className,
  ...HTMLButtonProps
}: ButtonProps) {
  return (
    <button
      className={`${variants[variant]} ${className}`}
      data-testid="button"
      {...HTMLButtonProps}
    >
      {children}
    </button>
  );
}
