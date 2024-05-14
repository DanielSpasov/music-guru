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
  verses: {
    add: AddVerseFn;
    del: DelVerseFn;
    edit: EditVerseFn;
    loading: number;
  };
};

export type VerseProps = {
  loading: number;
  created_by: string;
  del: DelVerseFn;
  edit: EditVerseFn;
  verse: Verse;
};
