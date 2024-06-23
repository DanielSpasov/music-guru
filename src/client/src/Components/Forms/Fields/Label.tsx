import { FC } from 'react';

const Label: FC<{ label: string; required?: boolean }> = ({
  required = false,
  label
}) => {
  return (
    <label>
      {label} <span className="text-red-400">{required && '*'}</span>
    </label>
  );
};

export default Label;
