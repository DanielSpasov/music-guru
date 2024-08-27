import { FC, useContext, useState } from 'react';

import { Form, Input, Loader, Textarea } from '../../../../../Components';
import { CreateVerseData, VerseSchema } from '../../../../../Validations';
import { AuthContext } from '../../../../../Contexts';
import { LyricsProps } from './types';

import css from './index.module.css';

// Composables
import Header from './composables/Header';
import Verse from './composables/Verse';

const Lyrics: FC<LyricsProps> = ({ song, verses, isEditor }) => {
  const [showNewVerse, setShowNewVerse] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <section className={css.warpper}>
      <Header
        disableAdd={!isEditor}
        showAdd={Boolean(isAuthenticated)}
        setShowNewVerse={setShowNewVerse}
      />

      <div
        className={`${css.versesWrapper} ${
          song.links.length
            ? 'lg:h-[calc(100vh-310px)]'
            : 'lg:h-[calc(100vh-220px)]'
        }`}
      >
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
          <div className={css.loader}>
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
