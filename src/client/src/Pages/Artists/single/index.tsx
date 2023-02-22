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
  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const actions = useActions({ model: 'single-artist', data: artist });
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.artists.get({
          id,
          config: { params: { populate: 'singles,created_by,features' } }
        });
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
            <Summary label="Albums" open>
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

            <Summary label="Singles" open>
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

            <Summary label="Mixtapes" open>
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

            <Summary label="Features" open>
              {!artist?.features.length ? (
                <Text>
                  {artist?.name} haven't been featured on any songs yet.
                </Text>
              ) : (
                <Box display="flex">
                  {artist.features.map(single => (
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
          </Summary>
        </Box>
      </Box>
    </PageLayout>
  );
}
