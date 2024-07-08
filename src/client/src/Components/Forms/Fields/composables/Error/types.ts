import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export type ErrorMessage =
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>;

export type ErrorProps = {
  message?: ErrorMessage;
};
