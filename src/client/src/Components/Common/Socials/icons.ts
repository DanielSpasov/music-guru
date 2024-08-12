import { ElementType } from 'react';

import { IAppleMusic } from '../../../Components/Icons/IAppleMusic';
import { IFacebook } from '../../../Components/Icons/IFacebook';
import { IInstagram } from '../../../Components/Icons/IInstagram';
import { ISoundcloud } from '../../../Components/Icons/ISoundcloud';
import { ISpotify } from '../../../Components/Icons/ISpotify';
import { ITwitter } from '../../../Components/Icons/ITwitter';
import { IYoutube } from '../../../Components/Icons/IYoutube';

import { ArtistSocials } from '../../../Validations';

export const icons: Record<keyof ArtistSocials, ElementType> = {
  instagram: IInstagram,
  x: ITwitter,
  facebook: IFacebook,
  spotify: ISpotify,
  apple_music: IAppleMusic,
  youtube: IYoutube,
  soundcloud: ISoundcloud
};

export const iconColors: Record<keyof ArtistSocials, string> = {
  instagram: '[&>div]:hover:bg-[#E1306C]',
  x: '[&>div]:hover:bg-[#000000]',
  facebook: '[&>div]:hover:bg-[#4267B2]',
  spotify: '[&>div]:hover:bg-[#1DB954]',
  apple_music: '[&>div]:hover:bg-[#fc3c44]',
  youtube: '[&>div]:hover:bg-[#FF0000]',
  soundcloud: '[&>div]:hover:bg-[#ff7700]'
};
