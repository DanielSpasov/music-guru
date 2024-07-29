import { BaseSyntheticEvent, InputHTMLAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type SideEffect = (
  event: BaseSyntheticEvent,
  formProps: Omit<UseFormReturn, 'register'>
) => Promise<void> | void;

export type InputProps = {
  label: string;
  name: string;
  sideEffect?: SideEffect;
} & InputHTMLAttributes<HTMLInputElement>;
