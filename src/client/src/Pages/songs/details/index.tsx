import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../../Contexts/Auth';
import { PageLayout } from '../../../Components';
import useSong from '../../../Hooks/useSong';

import Summary from './Summary';
import Lyrics from './Lyrics';

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
        <Summary
          song={song}
          albums={albums}
          updateImage={updateImage}
          userUID={uid}
        />

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
