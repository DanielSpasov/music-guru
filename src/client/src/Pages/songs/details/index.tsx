import { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Config } from '../../../Api/helpers';
import Delete from './modals/Delete';
import { Song } from '../helpers';
import Edit from './modals/Edit';
import Api from '../../../Api';

export default function SongDetails() {
  const [loading, setLoading] = useState(true);
  const [song, setSong] = useState<Song>();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const { uid } = useContext(AuthContext);
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const fetchSong = useCallback(async () => {
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
  }, [id]);

  const deleteSong = useCallback(async () => {
    try {
      setLoading(true);
      if (!song?.uid) return;
      await Api.songs.del({ id: song.uid });
      navigate('/songs');
      toast.success(`Successfully deleted song: ${song?.name}`);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [song, navigate]);

  useEffect(() => {
    (async () => await fetchSong())();
  }, [fetchSong]);

  const fetchFeatures = useCallback(
    (config?: Config) => {
      if (!song) return Promise.resolve({ data: [] });
      return Api.artists.fetch({
        config: {
          params: { uid__in: [...song.features, ' '], ...config?.params }
        }
      });
    },
    [song]
  );

  const fetchAlbums = useCallback(
    (config?: Config) => {
      if (!song) return Promise.resolve({ data: [] });
      return Api.albums.fetch({
        config: { params: { songs__contains: song.uid, ...config?.params } }
      });
    },
    [song]
  );

  const fetchArtist = useCallback(
    async (config?: Config) => {
      if (!song) return Promise.resolve({ data: [] });
      const { data } = await Api.artists.get({
        id: song.artist,
        config: { params: { serializer: 'list', ...config?.params } }
      });
      return { data: [data] };
    },
    [song]
  );

  return (
    <PageLayout
      title={song?.name || 'Loading...'}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          onClick: () => setOpenEdit(true),
          disabled: uid !== song?.created_by
        },
        {
          icon: 'trash',
          onClick: () => setOpenDel(true),
          disabled: uid !== song?.created_by
        }
      ]}
    >
      <section className="flex flex-col items-center text-white">
        <div className="flex mb-10">
          {song?.image && (
            <img
              src={song?.image || ''}
              alt={song?.name}
              className="w-64 h-64 rounded-lg"
            />
          )}
          <div className="px-4">
            {song?.release_date && (
              <div>
                <span className="font-bold">Release Date: </span>
                <span>{moment(song.release_date).format('MMMM Do YYYY')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div>
            <h3 className="text-center">Artist</h3>
            <List fetchFn={fetchArtist} skeletonLength={1} model="artists" />
          </div>

          <div>
            <h3 className="text-center">Featured Artists</h3>
            <List fetchFn={fetchFeatures} skeletonLength={2} model="artists" />
          </div>

          <div>
            <h3 className="text-center">In Albums</h3>
            <List fetchFn={fetchAlbums} skeletonLength={1} model="albums" />
          </div>
        </div>
      </section>

      <section>
        {openEdit && (
          <Modal onClose={() => setOpenEdit(false)}>
            <Edit onClose={() => setOpenEdit(false)} fetchSong={fetchSong} />
          </Modal>
        )}

        {openDel && (
          <Modal onClose={() => setOpenDel(false)} className="h-min p-3">
            <Delete
              deleteSong={deleteSong}
              setOpenDel={setOpenDel}
              fetchSong={fetchSong}
            />
          </Modal>
        )}
      </section>
    </PageLayout>
  );
}
