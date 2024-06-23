import { FC } from 'react';

const Error: FC<{ message: any }> = ({ message }) => {
  return <span className="text-red-400">{message?.toString()}</span>;
};

export default Error;
