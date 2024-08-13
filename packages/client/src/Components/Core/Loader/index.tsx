import { FC, memo } from 'react';

import { LoaderProps, PlayerProps, VinylProps, SpinnerProps } from './types';

// Comoposables
import Spinner from './composables/Spinner';
import Player from './composables/Player';
import Vinyl from './composables/Vinyl';

export const Loader: FC<LoaderProps> = ({ type = 'spinner', ...props }) => {
  switch (type) {
    case 'player':
      return <Player {...(props as PlayerProps)} />;
    case 'vinyl':
      return <Vinyl {...(props as VinylProps)} />;
    default:
      return <Spinner {...(props as SpinnerProps)} />;
  }
};

export default memo(Loader);
