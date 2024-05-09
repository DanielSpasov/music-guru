import { ButtonProps } from './types';
import { variants } from './variants';

export default function Button({
  children,
  variant = 'primary',
  ...HTMLButtonProps
}: ButtonProps) {
  return (
    <button
      className={variants[variant]}
      data-testid="button"
      {...HTMLButtonProps}
    >
      {children}
    </button>
  );
}
