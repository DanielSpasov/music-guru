import { useContext, useMemo, useState } from 'react';

import { VerseProps, wrapperProps } from './helpers';
import { Form, Icon } from '../../../../Components';
import { AuthContext } from '../../../../Contexts';
import { editVerseSchema } from './schemas';

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
      <div className={`mt-4 rounded-md ${wrapperProps}`}>
        <div className="flex justify-between pt-3 px-3">
          <h3>Edit Verse</h3>
          <Icon
            model="close"
            onClick={() => setIsEditing(false)}
            className="w-8 right-0"
          />
        </div>

        <Form
          {...editVerseSchema}
          showClose={false}
          defaultValues={verse}
          onSubmit={formData => {
            editVerse(verse.number, formData);
            setIsEditing(false);
          }}
        />
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
              onClick={() => setIsEditing(true)}
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
