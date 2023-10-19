import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Button, Heading, Icon, Link, Text } from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { Album } from '../../../albums/helpers';
import { DeleteSongProps } from './helpers';
import Api from '../../../../Api';

export default function DeleteSong({
  deleteSong,
  setOpenDel
}: DeleteSongProps) {
  const [loading, setLoading] = useState<string[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  const { id = '0' } = useParams();

  const fetchAlbums = useCallback(async () => {
    try {
      if (!id) return;

      const { data: albums } = await Api.albums.fetch({
        config: {
          params: {
            serializer: 'detailed',
            songs__contains: id
          }
        }
      });
      setAlbums(albums);
    } catch (error) {
      errorHandler(error);
    }
  }, [id]);

  useEffect(() => {
    (async () => await fetchAlbums())();
  }, [fetchAlbums]);

  const editFn = useCallback(
    async (album: Album) => {
      try {
        setLoading(prev => [...prev, album.uid]);
        const songs = album.songs.filter(x => x !== id);
        await Api.albums.patch({
          id: album.uid,
          body: { ...album, songs }
        });
        fetchAlbums();
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(prev => prev.filter(x => x !== album.uid));
      }
    },
    [id, fetchAlbums]
  );

  return (
    <Box>
      <Heading
        title={
          albums.length
            ? 'Cannot delete song.'
            : 'Are you sure you want to delete this song, this action cannot be undone.'
        }
        size="small"
        margin="0 0 1em 0"
      />

      {albums.length ? (
        <Box>
          <Box padding="1em 0">
            <b>Remove song from the following albums:</b>
          </Box>
          {albums.map((album, i) => {
            const disabled = loading.includes(album.uid);
            return (
              <Box
                key={album.uid}
                padding="0 1em"
                display="flex"
                alignItems="center"
              >
                <Box flexGrow=".25">
                  <Text>#{i + 1}</Text>
                </Box>

                <Box flexGrow="9.5" width="100px">
                  <Link to={`/albums/${album.uid}`} fontSize="1em">
                    {album.name}
                  </Link>
                </Box>

                <Box flexGrow=".25" display="flex" justifyContent="flex-end">
                  <Icon
                    model="trash"
                    size="1.5em"
                    disabled={disabled}
                    onClick={!disabled ? () => editFn(album) : () => null}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : null}

      <Box display="flex" justifyContent="space-between" marginTop="1em">
        <Button variant="secondary" onClick={() => setOpenDel(false)}>
          Cancel
        </Button>
        <Button onClick={deleteSong} disabled={albums.length}>
          Proceed
        </Button>
      </Box>
    </Box>
  );
}
