import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';

import { Box, Heading, Image, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Artist } from '../../artists/helpers';
import { Song } from '../../songs/helpers';
import { Album } from '../helpers';
import Api from '../../../Api';
import Modals from './modals';

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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 5%"
      >
        <Image src={album?.image || ''} alt={album?.name} width="350px" />

        {album && (
          <Box width="100%" margin="0.5em">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Heading title="Artist" />
                <List
                  data={[artist]}
                  model="artists"
                  skeletonLength={1}
                  loading={loadingArtist}
                />
              </Box>
              <Box>
                <Heading title="Songs" />
                <List
                  data={songs}
                  model="songs"
                  skeletonLength={3}
                  loading={loadingSongs}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Modals
        openDel={openDel}
        setOpenDel={setOpenDel}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        fetchAlbum={fetchAlbum}
        deleteAlbum={deleteAlbum}
      />
    </PageLayout>
  );
}
