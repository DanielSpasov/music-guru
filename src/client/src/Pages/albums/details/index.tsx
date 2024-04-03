import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Album } from '../helpers';
import Api from '../../../Api';

export default function AlbumDetails() {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<Album>();

  const deleteAlbum = useCallback(async () => {
    try {
      setLoading(true);
      if (!album?.uid) return;
      await Api.albums.del({ id: album.uid });
      navigate('/albums');
      toast.success(`Successfully deleted album: ${album.name}`);
    } catch (error) {
      errorHandler(error, navigate);
    } finally {
      setLoading(false);
    }
  }, [album, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.albums.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });
        setAlbum(data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const fetchArtist = useCallback(() => {
    if (!album) return Promise.resolve({ data: [] });
    return Promise.resolve({ data: [album.artist] });
  }, [album]);

  const fetchSongs = useCallback(() => {
    if (!album) return Promise.resolve({ data: [] });
    return Promise.resolve({ data: album?.songs || [] });
  }, [album]);

  return (
    <PageLayout
      title={album?.name || ''}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== album?.created_by
        },
        {
          icon: 'trash',
          onClick: deleteAlbum,
          hidden: !isAuthenticated,
          disabled: uid !== album?.created_by
        }
      ]}
    >
      <section className="flex flex-col items-center text-white">
        <img
          src={album?.image || ''}
          alt={album?.name}
          className="w-64 h-64 rounded-lg"
          loading="lazy"
        />

        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-center">Artist</h3>
            <List fetchFn={fetchArtist} model="artists" skeletonLength={1} />
          </div>
          <div>
            <h3 className="text-center">Songs</h3>
            <List fetchFn={fetchSongs} model="songs" skeletonLength={3} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
