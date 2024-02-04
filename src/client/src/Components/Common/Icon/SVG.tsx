import { SVGProps } from './';

export const lightProps = '[&>path]:text-primary';
export const darkProps = 'dark:[&>path]:text-neutral-50';

export const lightHoverProps = '[&>path]:hover:text-secondary';
export const darkHoverProps = 'dark:[&>path]:hover:text-primary-dark';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

export const disabledProps = `[&>path]:text-neutral-300 dark:[&>path]:text-neutral-500`;

export default function SVG({
  disabled = false,
  className,
  children,
  viewBox,
  onClick
}: SVGProps) {
  const onClickProps = `${darkProps} ${lightProps} ${onClick && hoverProps}`;
  const defaultProps = disabled ? disabledProps : onClickProps;

  return (
    <svg
      data-testid="svg-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      onClick={!disabled && onClick ? onClick : () => null}
      className={`${defaultProps} ${className}`}
    >
      {children}
    </svg>
  );
}
