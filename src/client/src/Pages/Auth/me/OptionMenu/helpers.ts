import { Dispatch } from 'react';
import { User } from '../../helpers';

export type MenuOptionType = 'string' | 'boolean' | 'date';

export type MenuOptionAction = {
  label: string;
  disabled?: boolean;
  hide?: boolean;
  onClick: () => any;
};

export type MenuOption = {
  label: string;
  field: keyof User;
  type: MenuOptionType;
  editable?: boolean;
  action?: MenuOptionAction;
};

export type OptionMenuProps = {
  icon: string;
  label: string;
  config: MenuOption[];
  setUser: Dispatch<User>;
  user: User;
};

export type OptionProps = {
  data: MenuOption;
  user: User;
  setUser: Dispatch<User>;
};
