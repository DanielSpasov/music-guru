import { Dispatch, SetStateAction } from 'react';

import { User } from '../../../Types/User';

export type MenuOption = {
  label: string;
  field: keyof User;
  type: 'string' | 'boolean' | 'date';
  editable?: boolean;
  action?: {
    label: string;
    disabled?: boolean;
    hide?: boolean;
    onClick: () => Promise<void | { message?: string }>;
  };
};

export type OptionProps = {
  data: MenuOption;
  user: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};
