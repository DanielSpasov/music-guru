import { FC, useContext, useState } from 'react';

import { IPen, ITrashBin } from '../../../../../../../Components';
import { AuthContext } from '../../../../../../../Contexts';
import { VerseProps } from './types';

// Composables
import EditVerse from '../EditVerse';

const SongVerse: FC<VerseProps> = ({ edit, del, loading, isEditor, verse }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  if (isEditing) {
    return (
      <EditVerse defaultValues={verse} onSubmit={edit} setShow={setIsEditing} />
    );
  }

  return (
    <div className={`py-4 ${loading === verse.number ? 'opacity-70' : ''}`}>
      <div className="flex items-center gap-2 sticky top-0 bg-neutral-100 dark:bg-neutral-800">
        <p className="font-semibold whitespace-nowrap">[{verse.title}]</p>

        <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-700" />

        {isAuthenticated ? (
          <div className="flex gap-2">
            <IPen
              className="w-6"
              disabled={!isEditor}
              onClick={() => setIsEditing(true)}
            />
            <ITrashBin
              className="w-6"
              disabled={!isEditor}
              onClick={() => del(verse.number)}
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
};

export default SongVerse;
