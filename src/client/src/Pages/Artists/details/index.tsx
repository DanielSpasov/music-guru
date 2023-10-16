import { useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useParams } from 'react-router-dom';

import {
  Box,
  Header,
  Image,
  List,
  PageLayout,
  Text
} from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { View, views } from './views';
import { Artist } from '../helpers';
import Api from '../../../Api';
import Modals from './modals';

export default function ArtistDetails() {
  const { uid: userUID } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);

  const { id = '0' } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [loadingView, setLoadingView] = useState<boolean>();
  const [viewData, setViewData] = useState<any[]>([]);
  const [view, setView] = useState<View>();

  // Views
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

  const fetchArtist = useCallback(async () => {
    try {
      const { data } = await Api.artists.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });
      setArtist(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    (async () => await fetchArtist())();
  }, [fetchArtist]);

  return (
    <PageLayout
      title={artist?.name || ''}
      showHeader={false}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          perform: () => setOpenEdit(true),
          disabled: userUID !== artist?.created_by
        }
      ]}
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

      <Modals
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        fetchArtist={fetchArtist}
      />
    </PageLayout>
  );
}
