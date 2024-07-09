import { ElementType } from 'react';

import { Socials } from '../../../../../Validations';
import {
  ISpotify,
  IYoutube,
  IAppleMusic,
  ISoundcloud
} from '../../../../../Components/Icons';

export const socialsColors: Record<keyof Socials, string> = {
  spotify: '[&>path]:hover:fill-[#1DB954]',
  apple_music: '[&>path]:hover:fill-[#fc3c44]',
  youtube: '[&>path]:hover:fill-[#FF0000]',
  soundcloud: '[&>path]:hover:fill-[#ff7700]'
};

export const icons: Record<keyof Socials, ElementType> = {
  spotify: ISpotify,
  apple_music: IAppleMusic,
  youtube: IYoutube,
  soundcloud: ISoundcloud
};
