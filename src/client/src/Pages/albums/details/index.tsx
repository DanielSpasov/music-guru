import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  Card,
  Heading,
  Image,
  Link,
  PageLayout
} from '../../../Components';
import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Album } from '../helpers';
import Api from '../../../Api';

export default function AlbumDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<Album>();

  const { id = '0' } = useParams();
  const navigate = useNavigate();

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

  const actions = useActions({
    model: 'album-details',
    data: album,
    deleteAlbum
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.albums.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });
        setAlbum(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  return (
    <PageLayout title={album?.name || ''} loading={loading} actions={actions}>
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
                <Card
                  image={album.artist.image}
                  title={album.artist.name}
                  onClick={() => navigate(`/artists/${album.artist.uid}`)}
                />
              </Box>
              <Box>
                <Heading title="Songs" />
                {album.songs.map(song => (
                  <Link key={song.uid} to={`/songs/${song.uid}`}>
                    {song.name}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </PageLayout>
  );
}
