import { Ref, UseFormRegister } from 'react-hook-form/dist/types';

export type InputType = 'password' | 'text' | 'email' | 'file';

type Error = {
  type: string;
  message: string;
  ref: Ref;
};

export type InputProps = {
  register: UseFormRegister<any>;
  type: InputType;
  label: string;
  name: string;
  error?: Error;
  required?: boolean;
};

export type FileInputProps = {
  register: UseFormRegister<any>;
  required?: boolean;
  name: string;
  label: string;
};

export type File = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
