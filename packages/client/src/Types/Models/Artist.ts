import { BaseDetailedModel, BaseModel } from './Base';
import { ArtistSocials } from '../../Validations';

export type Artist = BaseDetailedModel & {
  about: string;
  image: string;
  created_at: Date;
  favorites: number;
  links: { name: keyof ArtistSocials; url: string }[];
};

export type ListArtist = BaseModel & {
  image: string;
  favorites: number;
};
