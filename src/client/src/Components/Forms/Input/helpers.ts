import { Dispatch } from 'react';
import { Ref, UseFormRegister } from 'react-hook-form/dist/types';

type Error = {
  type: string;
  message: string;
  ref: Ref;
};

export type File = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type InputType = 'password' | 'text' | 'email' | 'file' | 'select';

export type InputProps = {
  register: UseFormRegister<any>;
  type: InputType;
  label: string;
  name: string;
  error?: Error;
  required?: boolean;
};

export interface TypeSwitchProps extends InputProps {
  passVisibility: boolean;
  setPassVisibility: Dispatch<boolean>;
}

export interface TextInputProps extends InputProps {
  passVisibility: boolean;
}

export interface PassInputProps extends InputProps {
  passVisibility: boolean;
  setPassVisibility: Dispatch<boolean>;
}
