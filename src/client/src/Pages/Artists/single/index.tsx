import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Artist } from '../helpers';
import Api from '../../../Api';
import {
  Box,
  Image,
  List,
  PageLayout,
  Summary,
  Text
} from '../../../Components';

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
          config: { params: { populate: 'singles,created_by,features,albums' } }
        });
        setArtist(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const showDiscography = useMemo(() => {
    if (!artist) return false;
    return (
      Boolean(artist.features.length) ||
      Boolean(artist.mixtapes.length) ||
      Boolean(artist.albums.length) ||
      Boolean(artist.singles.length)
    );
  }, [artist]);

  return (
    <PageLayout title={artist?.name || ''} loading={loading} actions={actions}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 5%"
      >
        <Image src={artist?.image || ''} alt={artist?.name} width="350px" />

        {showDiscography && artist && (
          <Box width="100%" margin="0.5em">
            <Summary label="Discography" open>
              {Boolean(artist.albums.length) && (
                <Summary label="Albums" open>
                  <Box display="flex" flexWrap="wrap">
                    <List data={artist.albums} model="albums" />
                  </Box>
                </Summary>
              )}

              {Boolean(artist.singles.length) && (
                <Summary label="Singles" open>
                  <Box display="flex" flexWrap="wrap">
                    <List data={artist.singles} model="singles" />
                  </Box>
                </Summary>
              )}

              {Boolean(artist.mixtapes.length) && (
                <Summary label="Mixtapes" open>
                  <Text>{artist.name} haven't released any mixtapes yet.</Text>
                </Summary>
              )}

              {Boolean(artist.features.length) && (
                <Summary label="Features" open>
                  <Box display="flex" flexWrap="wrap">
                    <List data={artist.features} model="singles" />
                  </Box>
                </Summary>
              )}
            </Summary>
          </Box>
        )}
      </Box>
    </PageLayout>
  );
}
