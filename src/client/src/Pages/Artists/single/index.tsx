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
import useActions from '../useActions';
import { Artist } from '../helpers';
import Api from '../../../Api';
import { errorHandler } from '../../../Handlers';

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
              {!artist?.albums?.length ? (
                <Text>{artist?.name} haven't released any albums yet.</Text>
              ) : (
                artist?.albums?.map(() => (
                  <Card image="Placeholder" title="Placeholder" />
                ))
              )}
            </Summary>
            <Summary label="Singles">
              {!artist?.singles?.length ? (
                <Text>{artist?.name} haven't released any singles yet.</Text>
              ) : (
                artist?.singles?.map(() => (
                  <Card image="Placeholder" title="Placeholder" />
                ))
              )}
            </Summary>
            <Summary label="Mixtapes">
              {!artist?.mixtapes?.length ? (
                <Text>{artist?.name} haven't released any mixtapes yet.</Text>
              ) : (
                artist?.mixtapes?.map(() => (
                  <Card image="Placeholder" title="Placeholder" />
                ))
              )}
            </Summary>
          </Summary>
        </Box>
      </Box>
    </PageLayout>
  );
}
