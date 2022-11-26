import { FC } from 'react';

import { InputType } from '../../Types';

export type FormField = {
  key: string;
  label: string;
  Component: FC<any>;
  type?: InputType;
  validation?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    custom?: Function;
  };
};

export type FormSchema = {
  fields: FormField[];
};
