import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useMemo } from 'react';

import { Image, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import useSong from '../../../Hooks/useSong';

import Socials from './Socials';
import Summary from './Summary';
import Lyrics from './Lyrics';
import About from './About';

export default function SongDetails() {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const { song, albums, loading, del, updateImage, verses } = useSong(id);

  const isOwner = useMemo(
    () => song.created_by === uid,
    [song.created_by, uid]
  );

  const isEditor = useMemo(
    () => Boolean(song.editors.find(user => user.uid === uid)) || isOwner,
    [song.editors, uid, isOwner]
  );

  return (
    <PageLayout
      title={song.name}
      loading={loading}
      actions={[
        {
          type: 'icon',
          icon: 'settings',
          onClick: () => navigate('settings'),
          hidden: !isOwner,
          disabled: !isOwner
        },
        {
          type: 'icon',
          icon: 'edit',
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: !isEditor
        },
        {
          type: 'icon',
          icon: 'trash',
          onClick: del,
          hidden: !isOwner,
          disabled: !isOwner
        }
      ]}
    >
      <section className="flex h-[calc(100vh-250px)]">
        <div className="flex flex-col items-start w-1/2 px-4 text-white">
          <div className="flex mb-10">
            <Image
              src={song?.image || ''}
              alt={song.name}
              editable={song.created_by === uid}
              size={64}
              className="rounded-lg"
              updateFn={updateImage}
            />

            <Summary song={song} albums={albums} />
          </div>

          <About song={song} />
          <Socials song={song} />
        </div>

        <Lyrics song={song} verses={verses} isEditor={isEditor} />
      </section>
    </PageLayout>
  );
}
