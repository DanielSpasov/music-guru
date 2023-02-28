import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';

import { FormField } from '../Form/helpers';
import { FC } from 'react';

export type SectionProps = {
  label: string;
  name: string;
  Component: FC<any>;
  fetchFn?: Function;
  required?: boolean;
  register: UseFormRegister<any>;
  getValues: UseFormGetValues<any>;
  setFormValue: UseFormSetValue<any>;
};

export enum ActionKind {
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

type Action = {
  type: ActionKind;
  payload?: FormField;
};

export function sectionReducer(
  state: FormField[],
  action: Action
): FormField[] {
  switch (action.type) {
    case 'ADD':
      console.log('add');
      return state;
    case 'REMOVE':
      console.log('remove');
      return state;
    default:
      return state;
  }
}
