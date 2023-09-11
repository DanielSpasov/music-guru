import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import {
  Box,
  Card,
  Heading,
  Image,
  List,
  PageLayout,
  Text
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
          config: { params: { serializer: 'detailed' } }
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
    <PageLayout
      title={song?.name || 'Loading...'}
      loading={loading}
      actions={actions}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 5%"
      >
        <Box margin="2em" display="flex">
          {song?.image && (
            <Image src={song?.image || ''} alt={song?.name} width="350px" />
          )}
          <Box padding="0 1em">
            {song?.release_date && (
              <Box>
                <Text fontWeight="bold">Release Date: </Text>
                <Text>{moment(song.release_date).format('MMMM Do YYYY')}</Text>
              </Box>
            )}
          </Box>
        </Box>

        {song && (
          <Box width="100%" margin="0.5em">
            <Box display="flex" justifyContent="center">
              <Box
                width="50%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Heading title="Artist" />
                <Card
                  image={song.artist.image}
                  title={song.artist.name}
                  onClick={() => navigate(`/artists/${song?.artist.uid}`)}
                />
              </Box>
              {song.features.length > 0 && (
                <Box width="50%">
                  <Heading title="Featured Artists" />
                  <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <List data={song.features} model="artists" />
                  </Box>
                </Box>
              )}
              {song.albums.length > 0 && (
                <Box width="50%">
                  <Heading title="In Albums" />
                  <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <List data={song.albums} model="albums" />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </PageLayout>
  );
}
