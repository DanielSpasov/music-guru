import { UseFormSetValue } from 'react-hook-form';

import { IconModel } from '../../../HTML/Icon/Icons';

type AcceptTypes = 'image/png' | 'image/jpeg';

type InputType = 'password' | 'text' | 'email' | 'file';

type TextProps = {
  type?: Exclude<InputType, 'file'>;
};
type FileProps = {
  type?: Extract<InputType, 'file'>;
  accept: AcceptTypes[];
};

export type InputProps = TextProps | FileProps;

export type UseInputProps = {
  type?: InputType;
  name: string;
  validateField: (name: string, value: any) => void;
  onChange: (...event: any[]) => void;
  setValue: UseFormSetValue<any>;
};

export type UseInputReturnType = {
  id: string;
  inputType: InputType;
  iconModel: IconModel;
  _onChange: (...event: any[]) => void;
  _onIconClick: () => void;
  _onClear: () => void;
};
