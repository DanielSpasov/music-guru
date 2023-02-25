import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  Card,
  Heading,
  Image,
  List,
  PageLayout
} from '../../../Components';
import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Song } from '../helpers';
import Api from '../../../Api';

export default function SongDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [song, setSong] = useState<Song>();

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const deleteSong = useCallback(async () => {
    try {
      setLoading(true);
      if (!song?.uid) return;
      await Api.songs.del({ id: song.uid });
      navigate('/songs');
      toast.success(`Successfully deleted song: ${song?.name}`);
    } catch (error) {
      errorHandler(error, navigate);
    } finally {
      setLoading(false);
    }
  }, [song, navigate]);

  const actions = useActions({
    model: 'song-details',
    data: song,
    deleteSong
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.songs.get({
          id,
          config: { params: { populate: 'artist,created_by,features' } }
        });
        setSong(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  return (
    <PageLayout title={song?.name || ''} loading={loading} actions={actions}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 5%"
      >
        <Image src={song?.image || ''} alt={song?.name} width="350px" />

        {song && (
          <Box width="100%" margin="0.5em">
            <Box display="flex" justifyContent="space-between">
              <Box width="50%">
                <Heading title="Artist" />
                <Card
                  image={song.artist.image}
                  title={song.artist.name}
                  onClick={() => navigate(`/artists/${song?.artist.uid}`)}
                />
              </Box>
              <Box width="50%">
                <Heading title="Featured Artists" />
                {Boolean(song.features.length) && (
                  <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <List data={song.features} model="artists" />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </PageLayout>
  );
}
