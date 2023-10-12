import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import {
  Box,
  Heading,
  Image,
  List,
  PageLayout,
  Text
} from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { Artist } from '../../artists/helpers';
import { Album } from '../../albums/helpers';
import useActions from '../useActions';
import { Song } from '../helpers';
import Api from '../../../Api';

export default function SongDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [song, setSong] = useState<Song>();

  const [loadingFeatures, setLoadingFeatures] = useState<boolean>(true);
  const [features, setFeatures] = useState<Artist[]>([]);

  const [loadingAlbums, setLoadingAlbums] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Album[]>([]);

  const [loadingArtist, setLoadingArtist] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

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
        setLoading(true);
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

  // Features
  useEffect(() => {
    (async () => {
      try {
        setLoadingFeatures(true);
        if (!song) return;

        const features = await Promise.all(
          song.features.map(async artistUID => {
            const { data } = await Api.artists.get({
              id: artistUID,
              config: { params: { serializer: 'list' } }
            });
            return data;
          })
        );
        setFeatures(features);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoadingFeatures(false);
      }
    })();
  }, [song]);

  // Albums
  useEffect(() => {
    (async () => {
      try {
        setLoadingAlbums(true);
        if (!song) return;

        const { data: albums } = await Api.albums.fetch({
          config: {
            params: {
              serializer: 'list',
              songs__contains: song?.uid
            }
          }
        });
        setAlbums(albums);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoadingAlbums(false);
      }
    })();
  }, [song]);

  // Artist
  useEffect(() => {
    (async () => {
      try {
        setLoadingArtist(true);
        if (!song) return;

        const { data } = await Api.artists.get({
          id: song.artist,
          config: { params: { serializer: 'list' } }
        });
        setArtist(data);
        setLoadingArtist(false);
      } catch (error) {
        errorHandler(error);
      }
    })();
  }, [song]);

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
                <List
                  data={[artist]}
                  model="artists"
                  skeletonLength={1}
                  loading={loadingArtist}
                />
              </Box>

              {features.length > 0 && (
                <Box width="50%">
                  <Heading title="Featured Artists" />
                  <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <List
                      data={features}
                      model="artists"
                      skeletonLength={2}
                      loading={loadingFeatures}
                    />
                  </Box>
                </Box>
              )}

              {albums.length > 0 && (
                <Box width="50%">
                  <Heading title="In Albums" />
                  <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <List
                      data={albums}
                      model="albums"
                      skeletonLength={1}
                      loading={loadingAlbums}
                    />
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
