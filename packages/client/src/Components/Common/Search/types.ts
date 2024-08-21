import { Dispatch, RefObject, SetStateAction } from 'react';

export type SearchProps = {
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  forwardRef?: RefObject<HTMLInputElement>;
};
