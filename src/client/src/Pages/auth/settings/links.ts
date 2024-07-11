import { ILock, IUser } from '../../../Components';
import { LinkGroup } from '../../../Components/Core/PageLayout/types';

export const sidebarLinks: LinkGroup[] = [
  {
    title: 'Settings',
    links: [
      {
        to: '/settings/account',
        label: 'Account',
        Icon: IUser
      },
      {
        to: '/settings/password',
        label: 'Password',
        Icon: ILock
      },
      {
        to: '/settings/mfa',
        label: 'MFA',
        Icon: ILock
      }
    ]
  }
];
