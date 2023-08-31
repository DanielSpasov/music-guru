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

export default function ArtistDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const actions = useActions({ model: 'artist-details', data: artist });
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.artists.get({
          id,
          config: { params: { populate: 'songs,features,albums' } }
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
      Boolean(artist.songs.length)
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

              {Boolean(artist.songs.length) && (
                <Summary label="Songs" open>
                  <Box display="flex" flexWrap="wrap">
                    <List data={artist.songs} model="songs" />
                  </Box>
                </Summary>
              )}

              {Boolean(artist.mixtapes.length) && (
                <Summary label="Mixtapes" open>
                  <Text>
                    {artist.name} haven&apos;t released any mixtapes yet.
                  </Text>
                </Summary>
              )}

              {Boolean(artist.features.length) && (
                <Summary label="Features" open>
                  <Box display="flex" flexWrap="wrap">
                    <List data={artist.features} model="songs" />
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
