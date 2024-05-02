import { useContext, useMemo } from 'react';

import { Icon, Loader } from '../../../../Components';
import { AuthContext } from '../../../../Contexts';
import { VerseProps } from './helpers';

export default function SongVerse({
  isNew = false,
  created_by,
  delVerse,
  loading,
  verse
}: VerseProps) {
  const { isAuthenticated, uid } = useContext(AuthContext);

  const disableAction = useMemo(
    () => Boolean(loading) || created_by !== uid,
    [loading, created_by, uid]
  );

  if (isNew) {
    return (
      <div className="mt-4 p-4 bg-neutral-300 dark:bg-neutral-950 rounded-md">
        <Loader size="sm" />
      </div>
    );
  }

  return (
    <div className={`py-4 ${loading === verse.number ? 'opacity-70' : ''}`}>
      <div className="flex items-center gap-2">
        <p className="font-semibold whitespace-nowrap">[{verse.title}]</p>

        <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-700" />

        {isAuthenticated ? (
          <div className="flex gap-2">
            <Icon
              model="trash"
              className="w-6"
              disabled={disableAction}
              onClick={() => delVerse(verse.number)}
            />
            <Icon
              model="edit"
              className="w-6"
              disabled={disableAction}
              onClick={() => null} // TODO: Implement verse editing
            />
            <Icon
              model="hamburger"
              className="w-6"
              disabled={disableAction}
              onClick={() => null} // TODO: Implement verse reordering
            />
          </div>
        ) : null}
      </div>

      {verse.lyrics.split('\n').map((line, lineKey) => (
        <p key={lineKey}>
          <span className="inline-block hover:bg-neutral-200 dark:hover:bg-neutral-700">
            {line}
          </span>
        </p>
      ))}
    </div>
  );
}
