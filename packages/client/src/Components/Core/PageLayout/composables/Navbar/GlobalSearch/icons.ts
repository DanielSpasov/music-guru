import { ElementType } from 'react';

import { IAlbum, IArtist, ISong } from '../../../../..';
import { Model } from '../../../../../../Api/types';

export const iconMap: Record<Model, ElementType> = {
  albums: IAlbum,
  artists: IArtist,
  songs: ISong,
  users: () => null
};
