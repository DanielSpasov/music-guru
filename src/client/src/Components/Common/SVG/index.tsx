import { FC } from 'react';

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
  onClick
}) => {
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
};

export default SVG;
