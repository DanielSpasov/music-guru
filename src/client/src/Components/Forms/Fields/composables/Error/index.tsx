import { FC, memo } from 'react';

import { ErrorProps } from './types';

const Error: FC<ErrorProps> = ({ message }) => {
  return <span className="text-red-400">{message?.toString()}</span>;
};

export default memo(Error);
