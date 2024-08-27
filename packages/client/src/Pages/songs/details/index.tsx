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
import { getSidebarLinks } from './sidebarLinks';
import { useSong } from '../../../Hooks';

import css from './index.module.css';

// Composables
import Summary from './composables/Summary';
import Lyrics from './composables/Lyrics';

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
      links={getSidebarLinks(id)}
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
      <section className={css.wrapper}>
        <div className={css.informationWrapper}>
          <div className={css.summaryWrapper}>
            <div className={css.imageWrapper}>
              <Image
                src={song?.image || ''}
                alt={song.name}
                editable={isEditor}
                updateFn={updateImage}
              />
            </div>

            <Summary song={song} albums={albums} />
          </div>

          {song.about && <span className={css.about}>{song.about}</span>}
        </div>

        <Lyrics song={song} verses={verses} isEditor={isEditor} />
      </section>
    </PageLayout>
  );
};

export default SongDetails;
