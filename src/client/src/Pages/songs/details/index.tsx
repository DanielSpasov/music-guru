import { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

import { Image, Link, List, PageLayout } from '../../../Components';
import { defaultArtist } from '../../artists/details';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Config } from '../../../Api/helpers';
import { Song } from '../helpers';
import Api from '../../../Api';

import Lyrics from './Lyrics';

const defaultSong: Song = {
  uid: '',
  created_at: new Date(),
  created_by: '',
  features: [],
  image: '',
  name: '',
  release_date: undefined,
  artist: defaultArtist,
  verses: []
};

export default function SongDetails() {
  const [song, setSong] = useState<Song>(defaultSong);
  const [loading, setLoading] = useState(true);

  const { uid, isAuthenticated } = useContext(AuthContext);
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const deleteSong = useCallback(async () => {
    try {
      setLoading(true);
      await Api.songs.del({ id: song.uid });
      navigate('/songs');
      toast.success(`Successfully deleted song: ${song.name}`);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [song, navigate]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await Api.songs.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });
        setSong(data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const fetchAlbums = useCallback(
    (config?: Config) =>
      Api.albums.fetch({
        config: { params: { 'songs.uid': song.uid, ...config?.params } }
      }),
    [song]
  );

  const updateImage = useCallback(
    async (file: File) => {
      const { image } = await Api.songs.updateImage({
        uid: song.uid,
        image: file,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      setSong(prev => ({ ...prev, image }));
    },
    [song.uid]
  );

  return (
    <PageLayout
      title={song.name}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== song.created_by
        },
        {
          icon: 'trash',
          onClick: deleteSong,
          hidden: !isAuthenticated,
          disabled: uid !== song.created_by
        }
      ]}
    >
      <article className="flex">
        <section className="flex flex-col w-1/2 items-start text-white">
          <div className="flex mb-10">
            <Image
              src={song?.image || ''}
              alt={song.name}
              editable={song.created_by === uid}
              size={64}
              className="rounded-lg"
              updateFn={updateImage}
            />

            <div className="px-4 gap-4">
              <div>
                <span className="font-bold">Release Date: </span>
                <span>{moment(song.release_date).format('MMMM Do YYYY')}</span>
              </div>

              <div>
                <span className="font-bold">Artist: </span>
                <Link to={`/artists/${song.artist.uid}`}>
                  {song.artist.name}
                </Link>
              </div>

              {song.features.length ? (
                <div>
                  <span className="font-bold">Featured artists: </span>
                  <span>
                    {song.features.map((artist, i) => (
                      <>
                        <Link to={`/artists/${artist.uid}`} key={artist.uid}>
                          {artist.name}
                        </Link>
                        {song.features.length > i + 1 ? ', ' : ''}
                      </>
                    ))}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <h3 className="text-center">In Albums</h3>
              <List fetchFn={fetchAlbums} skeletonLength={1} model="albums" />
            </div>
          </div>
        </section>

        <Lyrics song={song} />
      </article>
    </PageLayout>
  );
}
