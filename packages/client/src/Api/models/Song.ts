import { AxiosRequestConfig } from 'axios';

import { Editors, Favorite, SongVerses } from '../services';
import { ListSong, Song } from '../../Types';
import { post } from '../requests';
import Crud from '../crud';

export default class SongsAPI extends Crud<Song, ListSong> {
  model = 'song';

  editors = new Editors(this.model);
  favorite = new Favorite(this.model).favorite;
  verses = new SongVerses();

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
}
