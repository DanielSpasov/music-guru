import { FC } from 'react';

import { InputType } from '../../Types';

export type FormField = {
  key: string;
  label: string;
  Component: FC<any>;
  type?: InputType;
  required?: boolean;
  validate?: Function;
};

export type FormSchema = {
  fields: FormField[];
};
