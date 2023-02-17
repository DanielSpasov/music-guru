import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  Box,
  Card,
  Image,
  PageLayout,
  Summary,
  Text
} from '../../../Components';
import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Artist } from '../helpers';
import Api from '../../../Api';

export default function SingleArtist() {
  const actions = useActions({ model: 'single-artist' });
  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();
  const navigate = useNavigate();
  const { id = 0 } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.artists.get({ id });
        setArtist(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  return (
    <PageLayout title={artist?.name || ''} loading={loading} actions={actions}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 5%"
      >
        <Image src={artist?.image || ''} alt={artist?.name} width="350px" />

        <Box width="100%" margin="0.5em">
          <Summary label="Discography" open>
            <Summary label="Albums">
              {!artist?.albums.length ? (
                <Text>{artist?.name} haven't released any albums yet.</Text>
              ) : (
                <Box display="flex">
                  {artist.albums.map(() => (
                    <Card image="Placeholder" title="Placeholder" />
                  ))}
                </Box>
              )}
            </Summary>
            <Summary label="Singles">
              {!artist?.singles.length ? (
                <Text>{artist?.name} haven't released any singles yet.</Text>
              ) : (
                <Box display="flex">
                  {artist.singles.map(single => (
                    <Card
                      key={single.uid}
                      image={single.image}
                      title={single.name}
                      onClick={() => navigate(`/singles/${single.uid}`)}
                    />
                  ))}
                </Box>
              )}
            </Summary>
            <Summary label="Mixtapes">
              {!artist?.mixtapes.length ? (
                <Text>{artist?.name} haven't released any mixtapes yet.</Text>
              ) : (
                <Box display="flex">
                  {artist.mixtapes.map(() => (
                    <Card image="Placeholder" title="Placeholder" />
                  ))}
                </Box>
              )}
            </Summary>
          </Summary>
        </Box>
      </Box>
    </PageLayout>
  );
}
