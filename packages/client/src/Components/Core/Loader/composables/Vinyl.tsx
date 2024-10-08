import { FC, memo } from 'react';

import { vinyl, getColor, onPlayerProps, stripeProps } from '../styles';
import { VinylProps } from '../types';

const Vinyl: FC<VinylProps> = ({
  onPlayer = false,
  color = 'random',
  size = 'sm',
  ...props
}) => {
  const colorProps = getColor(color);

  return (
    <div
      data-testid="loader-vinyl"
      className={`relative m-auto bg-neutral-700 dark:bg-neutral-900 rounded-full ${
        vinyl[size].record
      } ${onPlayer && onPlayerProps}`}
      {...props}
    >
      <div
        data-testid="loader-vinyl-record-label"
        className={`relative rounded-full ${vinyl[size].recordLabel} ${colorProps}`}
      >
        <div
          data-testid="loader-vinyl-center-hole"
          className={`absolute bg-neutral-950 rounded-full ${vinyl[size].centerHole}`}
        />
      </div>
      <div
        data-testid="loader-vinyl-outter-stripe"
        className={`absolute duration-1000 animate-spin-slow ${vinyl[size].outterStripe} ${stripeProps}`}
      >
        <div
          data-testid="loader-vinyl-inner-stripe"
          className={`absolute ${vinyl[size].innerStripe} ${stripeProps}`}
        />
      </div>
    </div>
  );
};

export default memo(Vinyl);
