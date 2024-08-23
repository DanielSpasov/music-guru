import { BaseDetailedModel, BaseModel } from './Base';
import { Socials } from '../../Validations';
import { ListArtist } from './Artist';
import { ListSong } from './Song';

export type AlbumType = BaseModel & {
  code: string;
};

export type DiscSong = ListSong & { number: number };

export type Disc = {
  number: number;
  songs: DiscSong[];
};

export type Album = BaseDetailedModel & {
  type: AlbumType;
  image: string;
  about: string;
  created_at: Date;
  release_date: string | null;
  artist: ListArtist;
  songs: ListSong[];
  discs?: Disc[];
  favorites: number;
  links: { name: keyof Socials; url: string }[];
};

export type ListAlbum = BaseModel & {
  type: AlbumType;
  image: string;
  release_date: string | null;
  favorites: number;
};
