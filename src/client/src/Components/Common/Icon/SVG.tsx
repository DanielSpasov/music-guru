import { SVGProps } from './';

export default function SVG({
  disabled = false,
  className = 'h-9 w-9',
  children,
  viewBox,
  onClick
}: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      onClick={!disabled && onClick ? onClick : () => null}
      className={`${
        disabled ? '[&>path]:text-neutral-500' : onClick && 'cursor-pointer'
      } ${className}`}
    >
      {children}
    </svg>
  );
}
