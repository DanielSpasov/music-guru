import { FC, useMemo } from 'react';

import {
  SVGProps,
  darkProps,
  disabledProps,
  hoverProps,
  lightProps
} from './helpers';

const SVG: FC<SVGProps> = ({
  disabled = false,
  className,
  children,
  viewBox,
  onClick,
  ...svgProps
}) => {
  const onClickProps = `${darkProps} ${lightProps} ${onClick && hoverProps}`;
  const defaultProps = disabled ? disabledProps : onClickProps;

  const dataTestId = useMemo(
    () => svgProps?.['data-testid'] || 'svg-icon',
    [svgProps]
  );

  return (
    <svg
      data-testid={dataTestId}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      onClick={!disabled && onClick ? onClick : () => null}
      className={`${defaultProps} ${className}`}
      {...svgProps}
    >
      {children}
    </svg>
  );
};

export default SVG;
