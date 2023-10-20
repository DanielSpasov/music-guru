import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Icon, Link } from '../../../../Components';
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
    <div>
      <h1 className="text-center font-bold text-xl">
        {albums.length
          ? 'Cannot delete song.'
          : 'Are you sure you want to delete this song, this action cannot be undone.'}
      </h1>

      {albums.length ? (
        <article>
          <span>Remove song from the following albums:</span>
          {albums.map((album, i) => {
            const disabled = loading.includes(album.uid);
            return (
              <div key={album.uid} className="flex items-center px-4">
                <span className="grow w-24">#{i + 1}</span>

                <div className="grow">
                  <Link to={`/albums/${album.uid}`} fontSize="1em">
                    {album.name}
                  </Link>
                </div>

                <div className="flex justify-end grow">
                  <Icon
                    model="trash"
                    size="1.5em"
                    disabled={disabled}
                    onClick={!disabled ? () => editFn(album) : () => null}
                  />
                </div>
              </div>
            );
          })}
        </article>
      ) : null}

      <div className="flex justify-between mt-4">
        <button className="bg-secondary" onClick={() => setOpenDel(false)}>
          Cancel
        </button>
        <button onClick={deleteSong} disabled={Boolean(albums.length)}>
          Proceed
        </button>
      </div>
    </div>
  );
}
