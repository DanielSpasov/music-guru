import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { List, PageLayout, Image, IPen, Socials } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { Artist } from '../../../Types';
import Api from '../../../Api';

export const defaultArtist: Artist = {
  created_at: new Date(),
  created_by: '',
  favorites: 0,
  image: '',
  name: '',
  uid: '',
  about: '',
  links: []
};

const ArtistDetails = () => {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<Artist>(defaultArtist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.artists.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });
        setArtist(data);
      } catch (error) {
        toast.error('Failed to fetch Artist');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const updateImage = useCallback(
    async (file: File) => {
      const { image } = await Api.artists.updateImage({
        uid: artist.uid,
        image: file,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      setArtist(prev => ({ ...prev, image }));
    },
    [artist.uid]
  );

  return (
    <PageLayout
      title={artist.name}
      heading={artist.name}
      loading={loading}
      footerContent={<Socials links={artist.links} />}
      actions={[
        {
          type: 'icon',
          Icon: IPen,
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== artist.created_by
        }
      ]}
    >
      <section className="flex mt-5">
        <article className="flex flex-col items-center w-1/3 px-4">
          <div className="flex flex-col items-center">
            <Image
              src={artist.image}
              alt={artist.name}
              editable={artist.created_by === uid}
              updateFn={updateImage}
              shape="circle"
              className="w-64 h-64"
            />
            <h2 className="py-2">{artist.name}</h2>
          </div>

          <span className="mt-3 p-3 w-full border-[1px] border-neutral-200 dark:border-neutral-700 shadow-md dark:shadow-black rounded-md">
            {artist.about}
          </span>
        </article>

        <section className="flex flex-col w-2/3 gap-5">
          <article>
            <h2>Albums</h2>
            <List
              fetchFn={() =>
                Api.albums.fetch({
                  config: { params: { 'artist.uid': artist.uid } }
                })
              }
              favoriteFn={uid => Api.albums.favorite({ uid })}
              model="albums"
            />
          </article>

          <article>
            <h2>Songs</h2>
            <List
              fetchFn={() =>
                Api.songs.fetch({
                  config: { params: { 'artist.uid': artist.uid } }
                })
              }
              favoriteFn={uid => Api.songs.favorite({ uid })}
              model="songs"
            />
          </article>

          <article>
            <h2>Features</h2>
            <List
              fetchFn={() =>
                Api.songs.fetch({
                  config: { params: { 'features.uid': artist.uid } }
                })
              }
              favoriteFn={uid => Api.songs.favorite({ uid })}
              model="songs"
            />
          </article>
        </section>
      </section>
    </PageLayout>
  );
};

export default ArtistDetails;
