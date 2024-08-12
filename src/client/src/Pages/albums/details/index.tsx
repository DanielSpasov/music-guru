import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';

import { IPen, ITrashBin, Image, List, PageLayout } from '../../../Components';
import { defaultArtist } from '../../artists/details';
import { AuthContext } from '../../../Contexts/Auth';
import { Album } from '../../../Types';
import Api from '../../../Api';

export const defaultAlbum: Album = {
  uid: '',
  created_at: new Date(),
  created_by: '',
  image: '',
  name: '',
  release_date: null,
  songs: [],
  artist: defaultArtist,
  favorites: 0,
  type: {
    name: '',
    code: '',
    uid: ''
  }
};

const AlbumDetails = () => {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState<Album>(defaultAlbum);
  const [loading, setLoading] = useState(true);

  const deleteAlbum = useCallback(async () => {
    try {
      setLoading(true);
      await Api.albums.del({ id: album.uid });
      navigate('/albums');
      toast.success(`Successfully deleted album: ${album.name}`);
    } catch (error) {
      toast.error('Failed to delete album');
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
        toast.error('Failed to fetch Album');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const fetchArtist = useCallback(
    () => Promise.resolve({ data: [album.artist] }),
    [album]
  );

  const fetchSongs = useCallback(
    () => Promise.resolve({ data: album.songs || [] }),
    [album]
  );

  const updateImage = useCallback(
    async (file: File) => {
      const { image } = await Api.albums.updateImage({
        uid: album.uid,
        image: file,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      setAlbum(prev => ({ ...prev, image }));
    },
    [album?.uid]
  );

  return (
    <PageLayout
      title={album.name}
      heading={album.name}
      loading={loading}
      hideFooter
      actions={[
        {
          type: 'icon',
          Icon: IPen,
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== album.created_by
        },
        {
          type: 'icon',
          Icon: ITrashBin,
          onClick: deleteAlbum,
          hidden: !isAuthenticated,
          disabled: uid !== album.created_by
        }
      ]}
    >
      <section className="flex flex-col items-center text-white">
        <Image
          src={album.image}
          alt={album.name}
          editable={album.created_by === uid}
          updateFn={updateImage}
          className="w-64 h-64"
        />

        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-center">Artist</h3>
            <List
              fetchFn={fetchArtist}
              favoriteFn={uid => Api.artists.favorite({ uid })}
              model="artists"
              skeletonLength={1}
            />
          </div>
          <div>
            <h3 className="text-center">Songs</h3>
            <List
              fetchFn={fetchSongs}
              model="songs"
              skeletonLength={3}
              favoriteFn={uid => Api.songs.favorite({ uid })}
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AlbumDetails;
