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
      // {
      //   label: 'Albums',
      //   Icon: IAlbum,
      //   to: `/artists/${uid}/albums`,
      //   activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      // },
      // {
      //   label: 'Mixtapes',
      //   Icon: IAlbum,
      //   to: `/artists/${uid}/mixtapes`,
      //   activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      // },
      // {
      //   label: 'Songs',
      //   Icon: ISong,
      //   to: `/artists/${uid}/songs`,
      //   activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      // },
      // {
      //   label: 'Features',
      //   Icon: ISong,
      //   to: `/artists/${uid}/features`,
      //   activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      // }
    ]
  }
];
