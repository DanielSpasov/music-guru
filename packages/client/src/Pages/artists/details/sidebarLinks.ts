import { IAlbum, IArtist, ISong } from '../../../Components/Icons';
import { SidebarProps } from '../../../Components/Core/PageLayout/composables/Sidebar/types';

export const getSidebarLinks = (uid: string): SidebarProps['links'] => [
  {
    title: 'More',
    links: [
      {
        label: 'Details',
        Icon: IArtist,
        to: `/artists/${uid}`,
        activeIconColor: '[&>path]:fill-primary dark:[&>path]:fill-primary-dark'
      },
      {
        label: 'Albums',
        Icon: IAlbum,
        to: `/artists/${uid}/albums`,
        activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      },
      {
        label: 'Mixtapes',
        Icon: IAlbum,
        to: `/artists/${uid}/mixtapes`,
        activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      },
      {
        label: 'Songs',
        Icon: ISong,
        to: `/artists/${uid}/songs`,
        activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      },
      {
        label: 'Features',
        Icon: ISong,
        to: `/artists/${uid}/features`,
        activeIconColor: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
      }
    ]
  }
];
