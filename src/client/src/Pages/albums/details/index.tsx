import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Config } from '../../../Api/helpers';
import Delete from './modals/Delete';
import { Album } from '../helpers';
import Edit from './modals/Edit';
import Api from '../../../Api';

export default function AlbumDetails() {
  const { uid: userUID } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDel, setOpenDel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<Album>();

  const deleteAlbum = useCallback(async () => {
    try {
      setLoading(true);
      if (!album?.uid) return;
      await Api.albums.del({ id: album.uid });
      navigate('/albums');
      toast.success(`Successfully deleted album: ${album.name}`);
    } catch (error) {
      errorHandler(error, navigate);
    } finally {
      setLoading(false);
    }
  }, [album, navigate]);

  const fetchAlbum = useCallback(async () => {
    try {
      const { data } = await Api.albums.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });
      setAlbum(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    (async () => await fetchAlbum())();
  }, [fetchAlbum]);

  const fetchArtist = useCallback(
    async (config?: Config) => {
      if (!album) return Promise.resolve({ data: [] });
      const { data } = await Api.artists.get({
        id: album.artist,
        config: { params: { serializer: 'list', ...config?.params } }
      });
      return { data: [data] };
    },
    [album]
  );

  const fetchSongs = useCallback(
    (config?: Config) => {
      if (!album) return Promise.resolve({ data: [] });
      return Api.songs.fetch({
        config: {
          params: { uid__in: [...album.songs, ' '], ...config?.params }
        }
      });
    },
    [album]
  );

  return (
    <PageLayout
      title={album?.name || ''}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          onClick: () => setOpenEdit(true),
          disabled: userUID !== album?.created_by
        },
        {
          icon: 'trash',
          onClick: () => setOpenDel(true),
          disabled: userUID !== album?.created_by
        }
      ]}
    >
      <section className="flex flex-col items-center text-white">
        <img
          src={album?.image || ''}
          alt={album?.name}
          className="w-64 h-64 rounded-lg"
        />

        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-center">Artist</h3>
            <List fetchFn={fetchArtist} model="artists" skeletonLength={1} />
          </div>
          <div>
            <h3 className="text-center">Songs</h3>
            <List fetchFn={fetchSongs} model="songs" skeletonLength={3} />
          </div>
        </div>
      </section>

      <section>
        {openEdit && (
          <Modal onClose={() => setOpenEdit(false)}>
            <Edit onClose={() => setOpenEdit(false)} fetchAlbum={fetchAlbum} />
          </Modal>
        )}

        {openDel && (
          <Modal onClose={() => setOpenDel(false)}>
            <Delete deleteAlbum={deleteAlbum} setOpenDel={setOpenDel} />
          </Modal>
        )}
      </section>
    </PageLayout>
  );
}
