import { ElementType } from 'react';

import { ArtistSocials } from '../../../../../Validations';
import {
  IAppleMusic,
  IFacebook,
  IInstagram,
  ISoundcloud,
  ISpotify,
  ITwitter,
  IYoutube
} from '../../../../../Components/Icons';

export const socialsColors: Record<keyof ArtistSocials, string> = {
  instagram: '[&>path]:hover:fill-[#E1306C]',
  x: '[&>path]:hover:fill-[#000000]',
  facebook: '[&>path]:hover:fill-[#4267B2]',
  spotify: '[&>path]:hover:fill-[#1DB954]',
  apple_music: '[&>path]:hover:fill-[#fc3c44]',
  youtube: '[&>path]:hover:fill-[#FF0000]',
  soundcloud: '[&>path]:hover:fill-[#ff7700]'
};

export const icons: Record<keyof ArtistSocials, ElementType> = {
  instagram: IInstagram,
  x: ITwitter,
  facebook: IFacebook,
  spotify: ISpotify,
  apple_music: IAppleMusic,
  youtube: IYoutube,
  soundcloud: ISoundcloud
};
