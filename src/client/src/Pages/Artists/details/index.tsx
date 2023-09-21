import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, Image, List, PageLayout, Text } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { Artist, View, views } from '../helpers';
import useActions from '../useActions';
import Api from '../../../Api';

export default function ArtistDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const [view, setView] = useState<View>();

  const actions = useActions({ model: 'artist-details', data: artist });
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.artists.get({
          id,
          config: { params: { serializer: 'detailed' } }
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
    <PageLayout
      title={artist?.name || ''}
      showHeader={false}
      loading={loading}
      actions={actions}
    >
      <Box
        backgroundColor="black"
        position="absolute"
        width="100%"
        height="calc(150px + 3em)"
        boxSizing="content-box"
      />

      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin="1.5em 0"
        height="300px"
      >
        <Image
          src={artist?.image || ''}
          alt={artist?.name}
          height="100%"
          borderRadius="50%"
        />

        <Box display="flex" padding="0 1em">
          {views.map(view =>
            artist?.[view.key]?.length ? (
              <Text
                key={view.key}
                padding="0 .25em"
                fontSize="1.25em"
                onClick={() => setView(view)}
              >
                {view.label}
              </Text>
            ) : null
          )}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        {view && (
          <Box display="flex" flexWrap="wrap">
            <List data={artist?.[view.key] || []} model={view.model} />
          </Box>
        )}
      </Box>
    </PageLayout>
  );
}
