import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useMemo } from 'react';

import {
  IPen,
  ISettings,
  ITrashBin,
  Image,
  PageLayout,
  Socials
} from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { useSong } from '../../../Hooks';

// Composables
import Summary from './composables/Summary';
import Lyrics from './composables/Lyrics';
import About from './composables/About';

const SongDetails = () => {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const { song, albums, loading, del, updateImage, verses } = useSong(id);

  const isOwner = useMemo(
    () => song.created_by === uid,
    [song.created_by, uid]
  );

  const isEditor = useMemo(() => {
    if (!uid) return false;
    return Boolean(song.editors.includes(uid)) || isOwner;
  }, [song.editors, uid, isOwner]);

  return (
    <PageLayout
      title={song.name}
      heading={song.name}
      loading={loading}
      footerContent={<Socials links={song.links} />}
      actions={[
        {
          type: 'icon',
          Icon: ISettings,
          onClick: () => navigate('settings'),
          hidden: !isOwner,
          disabled: !isOwner
        },
        {
          type: 'icon',
          Icon: IPen,
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: !isEditor
        },
        {
          type: 'icon',
          Icon: ITrashBin,
          onClick: del,
          hidden: !isOwner,
          disabled: !isOwner
        }
      ]}
    >
      <section className="flex h-[calc(100vh-260px)]">
        <div className="flex flex-col items-start w-1/2 px-4 text-white">
          <div className="flex mb-10">
            {uid ? (
              <Image
                src={song?.image || ''}
                alt={song.name}
                editable={song.created_by === uid || song.editors.includes(uid)}
                updateFn={updateImage}
                className="w-64 h-64"
              />
            ) : null}

            <Summary song={song} albums={albums} />
          </div>

          <About song={song} />
        </div>

        <Lyrics song={song} verses={verses} isEditor={isEditor} />
      </section>
    </PageLayout>
  );
};

export default SongDetails;
