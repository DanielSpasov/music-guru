import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Artist } from '../../artists/helpers';
import { Song } from '../../songs/helpers';
import Delete from './modals/Delete';
import { Album } from '../helpers';
import Edit from './modals/Edit';
import Api from '../../../Api';

export default function AlbumDetails() {
  const { uid: userUID } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<Album>();

  const [loadingArtist, setLoadingArtist] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const [loadingSongs, setLoadingSongs] = useState<boolean>(true);
  const [songs, setSongs] = useState<Song[]>([]);

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDel, setOpenDel] = useState<boolean>(false);

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

  // Artist
  useEffect(() => {
    (async () => {
      try {
        setLoadingArtist(true);
        if (!album) return;

        const { data } = await Api.artists.get({
          id: album.artist,
          config: { params: { serializer: 'list' } }
        });
        setArtist(data);
        setLoadingArtist(false);
      } catch (error) {
        errorHandler(error);
      }
    })();
  }, [album]);

  // Songs
  useEffect(() => {
    (async () => {
      try {
        setLoadingSongs(true);
        if (!album) return;

        const songs = await Promise.all(
          album.songs.map(async songUID => {
            const { data } = await Api.songs.get({
              id: songUID,
              config: { params: { serializer: 'list' } }
            });
            return data;
          })
        );
        setSongs(songs);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoadingSongs(false);
      }
    })();
  }, [album]);

  return (
    <PageLayout
      title={album?.name || ''}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          perform: () => setOpenEdit(true),
          disabled: userUID !== album?.created_by
        },
        {
          icon: 'trash',
          perform: () => setOpenDel(true),
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
            <h1 className="text-xl font-bold text-center">Artist</h1>
            <List
              data={[artist]}
              model="artists"
              skeletonLength={1}
              loading={loadingArtist}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-center">Songs</h1>
            <List
              data={songs}
              model="songs"
              skeletonLength={3}
              loading={loadingSongs}
            />
          </div>
        </div>
      </section>

      <section>
        <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
          <Edit onClose={() => setOpenEdit(false)} fetchAlbum={fetchAlbum} />
        </Modal>

        <Modal open={openDel} onClose={() => setOpenDel(false)}>
          <Delete deleteAlbum={deleteAlbum} setOpenDel={setOpenDel} />
        </Modal>
      </section>
    </PageLayout>
  );
}
