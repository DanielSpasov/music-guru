import { useContext } from 'react';
import { Ref, UseFormRegister } from 'react-hook-form/dist/types';
import { ThemeContext } from '../../../Contexts/Theme';

import { InputType } from '../../../Types';
import { Box, Text } from '../../HTML';

type Error = {
  type: string;
  message: string;
  ref: Ref;
};

export type InputProps = {
  register: UseFormRegister<any>;
  type: InputType;
  label: string;
  name: string;
  value: any;
  error?: Error;
  required?: boolean;
};

export type FileInputProps = {
  register: UseFormRegister<any>;
  required?: boolean;
  name: string;
  value: FileList;
};

export type File = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export function ErrorMessage({ error }: { error?: Error }) {
  const theme = useContext(ThemeContext);
  return (
    <Box display="flex" justifyContent="space-between">
      {error && <Text color={theme.danger}>{error?.message}</Text>}
    </Box>
  );
}
