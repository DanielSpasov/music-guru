import { useContext, useState } from 'react';

import { AuthContext } from '../../../../Contexts';
import { Loader } from '../../../../Components';
import { LyricsProps } from './helpers';

import NewVerse from './Forms/NewVerse';
import Header from './Header';
import Verse from './Verse';

export default function Lyrics({
  song,
  addVerse,
  delVerse,
  editVerse,
  verseLoading
}: LyricsProps) {
  const [showNewVerse, setShowNewVerse] = useState(false);

  const { isAuthenticated, uid } = useContext(AuthContext);

  return (
    <section className="w-1/2 relative h-full rounded-md">
      <Header
        disableAdd={uid !== song.created_by}
        showAdd={Boolean(isAuthenticated)}
        setShowNewVerse={setShowNewVerse}
      />

      <div className="h-full overflow-y-scroll mt-1 px-2">
        {song.verses.length ? (
          song.verses
            .sort((a, b) => a.number - b.number)
            .map((verse, verseKey) => (
              <Verse
                loading={verseLoading}
                created_by={song.created_by}
                editVerse={editVerse}
                delVerse={delVerse}
                verse={verse}
                key={verseKey}
              />
            ))
        ) : (
          <p>Lyrics for this song are not available yet.</p>
        )}

        {song.verses.length < verseLoading ? (
          <div className="mt-4 p-4 bg-neutral-300 dark:bg-neutral-950 rounded-md">
            <Loader size="sm" />
          </div>
        ) : null}

        <NewVerse
          show={showNewVerse}
          setShow={setShowNewVerse}
          onSubmit={addVerse}
        />
      </div>
    </section>
  );
}
