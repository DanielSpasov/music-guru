import { ArtistSocials } from '../../Validations';
import { BaseModel } from './Base';

export type Artist = BaseModel & {
  about: string;
  image: string;
  created_at: Date;
  created_by: string;
  favorites: number;
  links: { name: keyof ArtistSocials; url: string }[];
};

export type ListArtist = BaseModel & {
  image: string;
  favorites: number;
};
