import { FC, useContext, useState } from 'react';

import { Form, Input, Loader, Textarea } from '../../../../../Components';
import { CreateVerseData, VerseSchema } from '../../../../../Validations';
import { AuthContext } from '../../../../../Contexts';
import { LyricsProps } from './types';

// Composables
import Header from './composables/Header';
import Verse from './composables/Verse';

const Lyrics: FC<LyricsProps> = ({ song, verses, isEditor }) => {
  const [showNewVerse, setShowNewVerse] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <section className="w-1/2 relative h-full rounded-md">
      <Header
        disableAdd={!isEditor}
        showAdd={Boolean(isAuthenticated)}
        setShowNewVerse={setShowNewVerse}
      />

      <div className="h-full overflow-y-scroll mt-1 px-2">
        {song.verses.length ? (
          song.verses
            .sort((a, b) => a.number - b.number)
            .map((verse, verseKey) => (
              <Verse
                loading={verses.loading}
                isEditor={isEditor}
                edit={verses.edit}
                del={verses.del}
                verse={verse}
                key={verseKey}
              />
            ))
        ) : (
          <p>Lyrics for this song are not available yet.</p>
        )}

        {song.verses.length < verses.loading ? (
          <div className="mt-4 p-4 bg-neutral-300 dark:bg-neutral-950 rounded-md">
            <Loader type="vinyl" />
          </div>
        ) : null}

        {showNewVerse && (
          <Form<CreateVerseData>
            validationSchema={VerseSchema}
            className="w-full"
            header="New Verse"
            onSubmit={async formData => {
              await verses.add(formData);
              setShowNewVerse(false);
            }}
            onClose={() => setShowNewVerse(false)}
          >
            <Input name="title" label="Title" required />
            <Textarea name="lyrics" label="Lyrics" required />
          </Form>
        )}
      </div>
    </section>
  );
};

export default Lyrics;
