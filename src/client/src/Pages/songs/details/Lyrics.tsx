import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

import { Icon } from '../../../Components';
import { Song } from '../helpers';

import AddVerse from './AddVerse';

export const lightButtonProps =
  'bg-transparent border-primary [&>p]:text-primary';
export const darkButtonProps =
  'dark:border-neutral-900 dark:bg-transparent dark:shadow-md [&>p]:dark:text-white';
export const themeButtonProps = `border-2 ${lightButtonProps} ${darkButtonProps}`;

export const lightHoverButtonProps =
  'hover:bg-primary [&>p]:hover:text-white [&>svg>path]:hover:fill-white';
export const darkHoverButtonProps = 'hover:dark:bg-neutral-900';
export const hoverButtonProps = `hover:opacity-100 ${lightHoverButtonProps} ${darkHoverButtonProps}`;

export const buttonProps = `${themeButtonProps} ${hoverButtonProps}`;

export default function Lyrics({
  song,
  addVerse
}: {
  song: Song;
  addVerse: SubmitHandler<any>;
}) {
  const [showNewVerse, setShowNewVerse] = useState(false);

  return (
    <section className="w-1/2 rounded-md p-2">
      <div className="flex items-center justify-between">
        <h2>Lyrics</h2>
        <hr />
        <button
          className={`flex items-center rounded-full py-1 px-3 ${buttonProps}`}
          onClick={() => setShowNewVerse(true)}
        >
          <Icon model="add" />
          <p>Add Verse</p>
        </button>
      </div>

      <div>
        {song.verses.length ? (
          song.verses
            .sort((a, b) => Number(a.number) - Number(b.number))
            .map((verse, verseKey) => (
              <div key={verseKey} className="py-4">
                <p className="font-semibold">[{verse.title}]</p>

                {verse.lyrics.split('\n').map((line, lineKey) => (
                  <p key={lineKey}>
                    <span className="inline-block hover:bg-neutral-200 dark:hover:bg-neutral-700">
                      {line}
                    </span>
                  </p>
                ))}
              </div>
            ))
        ) : (
          <p>Lyrics for this song are not available yet.</p>
        )}

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
