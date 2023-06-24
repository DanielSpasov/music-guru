import { Dispatch } from 'react';
import { User } from '../../helpers';

export type MenuOptionType = 'string' | 'boolean';

export type MenuOptionAction = {
  label: string;
  disabled?: boolean;
  hide?: boolean;
  onClick: () => any;
};

export type MenuOption = {
  name: string;
  field: keyof User;
  value?: string | boolean;
  type?: MenuOptionType;
  action?: MenuOptionAction;
  editable?: boolean;
};

export type OptionMenuProps = {
  icon: {
    model: string;
    type: string;
  };
  label: string;
  config: MenuOption[];
  setUser: Dispatch<User>;
};
