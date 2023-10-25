import { SVGProps } from './';

export default function SVG({
  disabled = false,
  className,
  children,
  viewBox,
  onClick
}: SVGProps) {
  const defaultProps = '[&>path]:text-primary [&>path]:hover:text-secondary';
  const darkProps =
    'dark:[&>path]:hover:text-primary-dark dark:[&>path]:text-neutral-50';

  const onClickProps = onClick && `cursor-pointer ${darkProps} ${defaultProps}`;
  const disabledProps = disabled
    ? `[&>path]:text-neutral-300 dark:[&>path]:text-neutral-500`
    : onClickProps;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      onClick={!disabled && onClick ? onClick : () => null}
      className={`${disabledProps} ${className}`}
    >
      {children}
    </svg>
  );
}
