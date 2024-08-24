import { ISong } from '../../../Components/Icons';
import { SidebarProps } from '../../../Components/Core/PageLayout/composables/Sidebar/types';

export const getSidebarLinks = (uid: string): SidebarProps['links'] => [
  {
    title: 'Song',
    links: [
      {
        label: 'Details',
        Icon: ISong,
        to: `/songs/${uid}`,
        activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      }
    ]
  }
];
