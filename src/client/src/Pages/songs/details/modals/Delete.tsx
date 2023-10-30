import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Icon, Link } from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { Album } from '../../../albums/helpers';
import { DeleteSongProps } from './helpers';
import Api from '../../../../Api';

export default function Delete({
  deleteSong,
  setOpenDel,
  fetchSong
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
    <div>
      <h4 className="text-center">
        {albums.length
          ? 'Cannot delete song.'
          : 'Are you sure you want to delete this song, this action cannot be undone.'}
      </h4>

      {albums.length ? (
        <article>
          <span>Song is included in the following albums:</span>

          <table className="w-full text-md">
            <thead>
              <tr>
                <th className="text-start">#</th>
                <th className="text-start">Album Name</th>
                <th className="text-start">Remove</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album, i) => {
                const disabled = loading.includes(album.uid);
                return (
                  <tr key={album.uid}>
                    <td>#{i + 1}</td>
                    <td>
                      <Link to={`/albums/${album.uid}`}>{album.name}</Link>
                    </td>
                    <td>
                      <Icon
                        model="trash"
                        className="w-6 h-6"
                        disabled={disabled}
                        onClick={!disabled ? () => editFn(album) : () => null}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
      ) : null}

      <div className="flex justify-between mt-4">
        <button
          className="bg-secondary"
          onClick={() => {
            setOpenDel(false);
            fetchSong();
          }}
        >
          Cancel
        </button>
        <button onClick={deleteSong} disabled={Boolean(albums.length)}>
          Proceed
        </button>
      </div>
    </div>
  );
}
