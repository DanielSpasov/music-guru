import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

import {
  Box,
  Header,
  Image,
  List,
  PageLayout,
  Text
} from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { View, views } from './views';
import useActions from '../useActions';
import { Artist } from '../helpers';
import Api from '../../../Api';

export default function ArtistDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const [loadingView, setLoadingView] = useState<boolean>();
  const [viewData, setViewData] = useState<any[]>([]);
  const [view, setView] = useState<View>();

  // View
  useEffect(() => {
    (async () => {
      try {
        if (!view) return;
        setLoadingView(true);

        const params = view?.params
          ? { [view?.params.name]: artist?.[view?.params.key] }
          : {};
        const { data } = await Api[view.model].fetch({
          config: { params }
        });
        setViewData(data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoadingView(false);
      }
    })();
  }, [view, artist]);

  const { colors } = useContext(ThemeContext);

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
          width="300px"
          borderRadius="50%"
          border={`8px solid ${colors.baseLight}`}
        />

        <Box position="absolute" top="1.25em" left="52.5vw">
          <Header title={artist?.name || ''} />
        </Box>

        <Box display="flex" padding="0 1em">
          {views.map((view, i) => (
            <Text
              key={i}
              padding="0 .25em"
              fontSize="1.25em"
              onClick={() => setView(view)}
            >
              {view.label}
            </Text>
          ))}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        {view && (
          <Box display="flex" flexWrap="wrap">
            <List
              data={viewData}
              model={view.model}
              loading={loadingView}
              skeletonLength={2}
            />
          </Box>
        )}
      </Box>
    </PageLayout>
  );
}
