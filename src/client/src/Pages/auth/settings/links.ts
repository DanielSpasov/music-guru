import { IKey, ILock, IUser } from '../../../Components';
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
        Icon: IKey,
        iconColor: '[&>g]:stroke-black dark:[&>g]:stroke-white',
        activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      },
      {
        to: '/settings/mfa',
        label: 'MFA',
        Icon: ILock
      }
    ]
  }
];
