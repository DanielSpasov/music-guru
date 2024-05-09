import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Song, Verse } from '../../../../Types/Song';

export type DelVerseFn = (number: number) => Promise<void>;
export type AddVerseFn = SubmitHandler<any>;
export type EditVerseFn = (number: number, verse: Verse) => Promise<void>;

export type EditVerseProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
  onSubmit: EditVerseFn;
  defaultValues: Verse;
};

export type NewVerseProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onSubmit: AddVerseFn;
};

export type HeaderProps = {
  showAdd: boolean;
  disableAdd: boolean;
  setShowNewVerse: Dispatch<SetStateAction<boolean>>;
};

export type LyricsProps = {
  song: Song;
  addVerse: AddVerseFn;
  delVerse: DelVerseFn;
  editVerse: EditVerseFn;
  verseLoading: number;
};

export type VerseProps = {
  loading: number;
  created_by: string;
  delVerse: DelVerseFn;
  editVerse: EditVerseFn;
  verse: Verse;
};
