import { useContext, useState } from 'react';

import { Form, Icon, Loader } from '../../../../Components';
import { LyricsProps, wrapperProps } from './helpers';
import { AuthContext } from '../../../../Contexts';
import { createVerseSchema } from './schemas';

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
  editVerse,
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

        {showNewVerse ? (
          <div className={`mt-4 rounded-md ${wrapperProps}`}>
            <div className="flex justify-between pt-3 px-3">
              <h3>New Verse</h3>
              <Icon
                model="close"
                onClick={() => setShowNewVerse(false)}
                className="w-8 right-0"
              />
            </div>

            <Form
              {...createVerseSchema}
              showClose={false}
              onSubmit={e => {
                addVerse(e);
                setShowNewVerse(false);
              }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
