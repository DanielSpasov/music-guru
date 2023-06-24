import { MenuOption } from './OptionMenu/helpers';
import { User } from '../helpers';
import Api from '../../../Api';

export const getInfoConfig = (user: User): MenuOption[] => [
  {
    field: 'uid',
    name: 'UID',
    value: user.uid
  },
  {
    field: 'email',
    name: 'Email',
    value: user.email
  },
  {
    field: 'username',
    name: 'Username',
    value: user?.username,
    editable: true
  },
  {
    field: 'created_at',
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
    field: 'verified',
    name: 'Verified Email',
    value: user.verified,
    type: 'boolean',
    action: {
      label: 'Send Email',
      hide: user.verified,
      onClick: () => Api.user.reSendValidationEmail()
    }
  },
  {
    field: 'verified',
    name: 'Email 2FA',
    value: 'TODO'
  },
  {
    field: 'verified',
    name: 'Phone Number',
    value: 'TODO'
  },
  {
    field: 'verified',
    name: 'Google Authenticator',
    value: 'TODO'
  }
];
