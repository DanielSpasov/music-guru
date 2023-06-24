import { User } from '../helpers';
import Api from '../../../Api';

export type MenuOptionType = 'string' | 'boolean';

export type MenuOptionAction = {
  label: string;
  disabled?: boolean;
  hide?: boolean;
  onClick: () => any;
};

export type MenuOption = {
  name: string;
  value?: string | boolean;
  type?: MenuOptionType;
  action?: MenuOptionAction;
};

export type OptionMenuProps = {
  icon: {
    model: string;
    type: string;
  };
  label: string;
  config: MenuOption[];
};

export const getInfoConfig = (user: User): MenuOption[] => [
  { name: 'UID', value: user.uid },
  { name: 'Email', value: user.email },
  { name: 'Username', value: user?.username },
  {
    name: 'Date Created',
    value: new Date(user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
];

export const getMFAConfig = (user: User): MenuOption[] => [
  {
    name: 'Verified Email',
    value: user.verified,
    type: 'boolean',
    action: {
      label: 'Send Email',
      hide: user.verified,
      onClick: () => Api.user.reSendValidationEmail()
    }
  },
  { name: 'Email 2FA', value: 'TODO' },
  { name: 'Phone Number', value: 'TODO' },
  { name: 'Google Authenticator', value: 'TODO' }
];
