import { IAlbum } from '../../../Components/Icons';
import { SidebarProps } from '../../../Components/Core/PageLayout/composables/Sidebar/types';

export const getSidebarLinks = (uid: string): SidebarProps['links'] => [
  {
    title: 'Album',
    links: [
      {
        label: 'Details',
        Icon: IAlbum,
        to: `/albums/${uid}`,
        activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      }
    ]
  }
];
