import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge
} from 'react-hook-form';

export type ErrorMessage =
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<FieldValues>>;

export type ErrorProps = {
  message?: ErrorMessage;
};
