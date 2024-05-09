import { useContext, useMemo, useState } from 'react';

import { AuthContext } from '../../../../Contexts';
import { Icon } from '../../../../Components';
import EditVerse from './Forms/EditVerse';
import { VerseProps } from './helpers';

export default function SongVerse({
  created_by,
  editVerse,
  delVerse,
  loading,
  verse
}: VerseProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { isAuthenticated, uid } = useContext(AuthContext);

  const disableAction = useMemo(
    () => Boolean(loading) || created_by !== uid,
    [loading, created_by, uid]
  );

  if (isEditing) {
    return (
      <EditVerse
        defaultValues={verse}
        onSubmit={editVerse}
        setShow={setIsEditing}
      />
    );
  }

  return (
    <div className={`py-4 ${loading === verse.number ? 'opacity-70' : ''}`}>
      <div className="flex items-center gap-2 sticky top-0 bg-neutral-50 dark:bg-neutral-800">
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
              onClick={() => setIsEditing(true)}
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
