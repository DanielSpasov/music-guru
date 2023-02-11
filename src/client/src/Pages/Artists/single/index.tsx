import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Card,
  Image,
  PageLayout,
  Summary,
  Text
} from '../../../Components';
import { Artist } from '../helpers';
import Api from '../../../Api';

export default function SingleArtist() {
  const [artist, setArtist] = useState<Artist>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await Api.artists.get({ id });
      setArtist(data);
    })();
  }, [id]);

  return (
    <PageLayout title={artist?.name || ''} loading={!artist}>
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
                <Text>{artist?.name} doesn't have any albums yet.</Text>
              ) : (
                artist?.albums?.map(() => (
                  <Card image="Placeholder" title="Placeholder" />
                ))
              )}
            </Summary>
            <Summary label="Singles">
              {!artist?.singles.length ? (
                <Text>{artist?.name} doesn't have any singles yet.</Text>
              ) : (
                artist?.singles?.map(() => (
                  <Card image="Placeholder" title="Placeholder" />
                ))
              )}
            </Summary>
            <Summary label="Mixtapes">
              {!artist?.mixtapes.length ? (
                <Text>{artist?.name} doesn't have any mixtapes yet.</Text>
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
