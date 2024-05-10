import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../../Contexts/Auth';
import { Image, PageLayout } from '../../../Components';
import useSong from '../../../Hooks/useSong';

import Summary from './Summary';
import Lyrics from './Lyrics';
import About from './About';
import Socials from './Socials';

export default function SongDetails() {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const {
    song,
    albums,
    loading,
    del,
    updateImage,
    addVerse,
    delVerse,
    editVerse,
    verseLoading
  } = useSong(id);

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
        <section className="flex flex-col items-start w-1/2 px-4 text-white">
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
