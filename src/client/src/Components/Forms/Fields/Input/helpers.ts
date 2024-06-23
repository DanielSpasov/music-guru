import { BaseSyntheticEvent, InputHTMLAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type SideEffect = (
  event: BaseSyntheticEvent,
  formProps: Omit<UseFormReturn, 'register'>
) => any;

export type InputProps = {
  label: string;
  name: string;
  sideEffect?: SideEffect;
} & InputHTMLAttributes<HTMLInputElement>;
