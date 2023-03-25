import { Song } from '../../Pages/songs/helpers';
import { applyPrefix } from '../helpers';
import Crud from '../crud';

export default class SongsAPI extends Crud<Song> {
  model = 'song';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }
}
