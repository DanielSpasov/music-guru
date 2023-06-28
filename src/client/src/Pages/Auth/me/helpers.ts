import { MenuOption } from './OptionMenu/helpers';
import { User } from '../helpers';
import Api from '../../../Api';

export const infoConfig: MenuOption[] = [
  {
    field: 'uid',
    label: 'UID',
    type: 'string'
  },
  {
    field: 'email',
    label: 'Email',
    type: 'string'
  },
  {
    field: 'username',
    label: 'Username',
    editable: true,
    type: 'string'
  },
  {
    field: 'created_at',
    label: 'Date Created',
    type: 'date'
  }
];

export const getMFAConfig = (user: User): MenuOption[] => [
  {
    field: 'verified',
    label: 'Verified Email',
    type: 'boolean',
    action: {
      label: 'Send Email',
      hide: user.verified,
      onClick: () => Api.user.reSendValidationEmail()
    }
  },
  {
    field: 'verified',
    label: 'Email 2FA',
    type: 'boolean'
  },
  {
    field: 'verified',
    label: 'Phone Number',
    type: 'boolean'
  },
  {
    field: 'verified',
    label: 'Google Authenticator',
    type: 'boolean'
  }
];