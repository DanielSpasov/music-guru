import { FC, memo } from 'react';

import { ISpinner } from '../../../Icons';
import { SpinnerProps } from '../types';
import { spinner } from '../styles';

const Spinner: FC<SpinnerProps> = ({ size = 'sm', className, ...props }) => {
  return (
    <ISpinner
      data-testid="loader-spinner"
      className={`animate-spin ${className} ${spinner[size]}`}
      {...props}
    />
  );
};

export default memo(Spinner);
