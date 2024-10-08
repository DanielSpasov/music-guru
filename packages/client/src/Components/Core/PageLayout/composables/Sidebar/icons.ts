import { ElementType } from 'react';

import { IAlbum, IArtist, ISettings, ISong } from '../../../..';

export const icons: Record<string, ElementType> = {
  albums: IAlbum,
  artists: IArtist,
  songs: ISong,
  settings: ISettings
};

export const iconColor: Record<string, string> = {
  artists: '[&>path]:fill-black dark:[&>path]:fill-white',
  settings: '[&>path]:fill-black dark:[&>path]:fill-white',
  'access-denied':
    '[&>path:nth-child(2)]:fill-black dark:[&>path:nth-child(2)]:fill-white'
};

export const activeIconColor: Record<string, string> = {
  artists: '[&>path]:fill-primary dark:[&>path]:fill-primary-dark',
  albums: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark',
  songs: '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark',
  'access-denied':
    '[&>path:nth-child(2)]:fill-primary dark:[&>path:nth-child(2)]:fill-primary-dark'
};
