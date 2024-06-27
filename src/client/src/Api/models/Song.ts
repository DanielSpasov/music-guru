import { ListSong, Song, Verse } from '../../Types/Song';
import { del, patch, post, get } from '../requests';
import { Config, applyPrefix } from '../helpers';
import Crud from '../crud';

export default class SongsAPI extends Crud<Song, ListSong> {
  model = 'song';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }

  updateImage({
    uid,
    image,
    config = {}
  }: {
    uid: string;
    image: File;
    config?: Config;
  }) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/image/`,
      body: { image },
      config
    });
  }

  addVerse({
    uid,
    payload,
    config
  }: {
    uid: string;
    payload: any;
    config?: Config;
  }) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/verse/`,
      body: payload,
      config
    });
  }

  delVerse({
    uid,
    number,
    config = {}
  }: {
    uid: string;
    number: number;
    config?: Config;
  }) {
    return del({
      url: `${this.baseUrl}/${this.model}/${uid}/verse/${number}/`,
      config
    });
  }

  editVerse({
    uid,
    number,
    verse,
    config = {}
  }: {
    uid: string;
    number: number;
    verse: Verse;
    config?: Config;
  }) {
    return patch({
      url: `${this.baseUrl}/${this.model}/${uid}/verse/${number}/`,
      body: { verse },
      config
    });
  }

  addEditor({
    uid,
    userUID,
    config = {}
  }: {
    uid: string;
    userUID: string;
    config?: Config;
  }) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/editor/`,
      body: { userUID },
      config
    });
  }

  delEditor({
    uid,
    userUID,
    config = {}
  }: {
    uid: string;
    userUID: string;
    config?: Config;
  }) {
    return del({
      url: `${this.baseUrl}/${this.model}/${uid}/editor/${userUID}/`,
      config
    });
  }

  fetchAvailableEditors({
    uid,
    config = {}
  }: {
    uid: string;
    config?: Config;
  }) {
    return get({
      url: `${this.baseUrl}/${this.model}/${uid}/editors/available/`,
      config
    });
  }

  favorite({ uid, config = {} }: { uid: string; config?: Config }) {
    return post({
      url: `${this.baseUrl}/${this.model}/favorite/`,
      body: { uid },
      config
    });
  }
}
