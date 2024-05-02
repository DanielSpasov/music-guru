import { SubmitHandler } from 'react-hook-form';

import { Song, Verse } from '../../helpers';

export type DelVerseFn = (number: number) => Promise<void>;
export type AddVerseFn = SubmitHandler<any>;

export type LyricsProps = {
  song: Song;
  addVerse: AddVerseFn;
  delVerse: DelVerseFn;
  verseLoading: number;
};

export type VerseProps = {
  isNew?: boolean;
  loading: number;
  created_by: string;
  delVerse: DelVerseFn;
  verse: Verse;
};

export type AddVerseProps = {
  onClose: () => void;
  onSubmit: AddVerseFn;
};
