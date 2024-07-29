import ArtistsAPI from './models/Artist';
import AlbumsAPI from './models/Album';
import SongsAPI from './models/Song';
import UserAPI from './models/User';

const Api = {
  artists: new ArtistsAPI(),
  albums: new AlbumsAPI(),
  songs: new SongsAPI(),
  users: new UserAPI()
};

export default Api;
