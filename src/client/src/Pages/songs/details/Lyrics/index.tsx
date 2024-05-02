import { useContext, useState } from 'react';

import { AuthContext } from '../../../../Contexts';
import { Icon } from '../../../../Components';
import { LyricsProps } from './helpers';

import AddVerse from './AddVerse';
import Verse from './Verse';

export const lightButtonProps =
  'bg-transparent border-primary [&>p]:text-primary';
export const darkButtonProps =
  'dark:border-neutral-900 dark:bg-transparent dark:shadow-md [&>p]:dark:text-white';
export const themeButtonProps = `border-2 ${lightButtonProps} ${darkButtonProps}`;

export const lightHoverButtonProps =
  'hover:bg-primary [&>p]:hover:text-white [&>svg>path]:hover:fill-white';
export const darkHoverButtonProps = 'hover:dark:bg-neutral-900';
export const hoverButtonProps = `hover:opacity-100 ${lightHoverButtonProps} ${darkHoverButtonProps}`;

export default function Lyrics({
  song,
  addVerse,
  delVerse,
  verseLoading
}: LyricsProps) {
  const [showNewVerse, setShowNewVerse] = useState(false);

  const { isAuthenticated, uid } = useContext(AuthContext);

  return (
    <section className="w-1/2 rounded-md p-2">
      <div className="flex items-center justify-between">
        <h2>Lyrics</h2>

        {isAuthenticated ? (
          <button
            className={`flex items-center rounded-full py-1 px-3 ${themeButtonProps} ${
              uid === song.created_by ? hoverButtonProps : ''
            }`}
            onClick={() => {
              setShowNewVerse(true);
              requestAnimationFrame(() => {
                const form = document.querySelector('form');
                if (form) form.scrollIntoView({ behavior: 'smooth' });
              });
            }}
            disabled={uid !== song.created_by}
          >
            <Icon model="add" />
            <p>Add Verse</p>
          </button>
        ) : null}
      </div>

      <div className="h-fit overflow-scroll">
        {song.verses.length ? (
          song.verses
            .sort((a, b) => a.number - b.number)
            .map((verse, verseKey) => (
              <Verse
                loading={verseLoading}
                created_by={song.created_by}
                delVerse={delVerse}
                verse={verse}
                key={verseKey}
              />
            ))
        ) : (
          <p>Lyrics for this song are not available yet.</p>
        )}

        {song.verses.length < verseLoading ? (
          <Verse
            isNew
            created_by={song.created_by}
            verse={{ lyrics: '', number: verseLoading, title: '' }}
            delVerse={delVerse}
            loading={verseLoading}
          />
        ) : null}

        {showNewVerse ? (
          <AddVerse
            onClose={() => setShowNewVerse(false)}
            onSubmit={addVerse}
          />
        ) : null}
      </div>
    </section>
  );
}
