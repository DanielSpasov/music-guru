import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useCallback, useContext } from 'react';
import moment from 'moment';

import { Image, Link, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { Config } from '../../../Api/helpers';
import useSong from '../../../Hooks/useSong';
import Api from '../../../Api';

import Lyrics from './Lyrics';

export default function SongDetails() {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const {
    song,
    loading,
    del,
    updateImage,
    addVerse,
    delVerse,
    editVerse,
    verseLoading
  } = useSong(id);

  const fetchAlbums = useCallback(
    (config?: Config) =>
      Api.albums.fetch({
        config: { params: { 'songs.uid': song.uid, ...config?.params } }
      }),
    [song]
  );

  return (
    <PageLayout
      title={song.name}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== song.created_by
        },
        {
          icon: 'trash',
          onClick: del,
          hidden: !isAuthenticated,
          disabled: uid !== song.created_by
        }
      ]}
    >
      <article className="flex relative h-[calc(100vh-200px)]">
        <section className="flex flex-col w-1/2 items-start text-white">
          <div className="flex mb-10">
            <Image
              src={song?.image || ''}
              alt={song.name}
              editable={song.created_by === uid}
              size={64}
              className="rounded-lg"
              updateFn={updateImage}
            />

            <div className="px-4 gap-4">
              <div>
                <span className="font-bold">Release Date: </span>
                {song?.release_date ? (
                  <span>
                    {moment(song.release_date).format('MMMM Do YYYY')}
                  </span>
                ) : (
                  <span>TBA</span>
                )}
              </div>

              <div>
                <span className="font-bold">Artist: </span>
                <Link to={`/artists/${song.artist.uid}`}>
                  {song.artist.name}
                </Link>
              </div>

              {song.features.length ? (
                <div>
                  <span className="font-bold">Featured artists: </span>
                  <span>
                    {song.features.map((artist, i) => (
                      <Fragment key={artist.uid}>
                        <Link to={`/artists/${artist.uid}`}>{artist.name}</Link>
                        {song.features.length > i + 1 ? ', ' : ''}
                      </Fragment>
                    ))}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <h3 className="text-center">In Albums</h3>
              <List fetchFn={fetchAlbums} skeletonLength={1} model="albums" />
            </div>
          </div>
        </section>

        <Lyrics
          song={song}
          addVerse={addVerse}
          delVerse={delVerse}
          editVerse={editVerse}
          verseLoading={verseLoading}
        />
      </article>
    </PageLayout>
  );
}
