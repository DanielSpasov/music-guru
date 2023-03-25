import { UseFormRegister } from 'react-hook-form/dist/types';

export type File = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type InputType = 'password' | 'text' | 'email';

export type InputProps = {
  register: UseFormRegister<any>;
  required?: boolean;
  type: InputType;
  label: string;
  name: string;
};
