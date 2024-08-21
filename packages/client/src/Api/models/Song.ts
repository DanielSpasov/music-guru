import { AxiosRequestConfig } from 'axios';

import { ListSong, Song, Verse } from '../../Types';
import { Editors, Favorite } from '../services';
import { del, patch, post } from '../requests';
import { Body } from '../types';
import Crud from '../crud';

export default class SongsAPI extends Crud<Song, ListSong> {
  model = 'song';

  editors = new Editors(this.model);
  favorite = new Favorite(this.model).favorite;

  constructor() {
    super();
  }

  updateImage(
    {
      uid,
      image,
      config
    }: {
      uid: string;
      image: File;
      config?: AxiosRequestConfig;
    } = {
      uid: '',
      image: new File(['image.jpg'], 'image.jpg'),
      config: {}
    }
  ) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/image/`,
      body: { image },
      config
    });
  }

  addVerse(
    {
      uid,
      payload,
      config
    }: {
      uid: string;
      payload: Body;
      config?: AxiosRequestConfig;
    } = {
      uid: '',
      payload: {},
      config: {}
    }
  ) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/verse/`,
      body: payload,
      config
    });
  }

  delVerse(
    {
      uid,
      number,
      config
    }: {
      uid: string;
      number: number;
      config?: AxiosRequestConfig;
    } = {
      uid: '',
      number: 0,
      config: {}
    }
  ) {
    return del({
      url: `${this.baseUrl}/${this.model}/${uid}/verse/${number}/`,
      config
    });
  }

  editVerse(
    {
      uid,
      number,
      verse,
      config
    }: {
      uid: string;
      number: number;
      verse: Verse;
      config?: AxiosRequestConfig;
    } = {
      uid: '',
      number: 0,
      verse: { lyrics: '', number: 0, title: '' },
      config: {}
    }
  ) {
    return patch({
      url: `${this.baseUrl}/${this.model}/${uid}/verse/${number}/`,
      body: { verse },
      config
    });
  }
}
