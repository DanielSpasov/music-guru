import { Dispatch, SetStateAction } from 'react';

import { SubmitFn } from '../../../../Components/Forms/Form/types';
import { CreateVerseData } from '../../../../Validations';
import { Song, Verse } from '../../../../Types';

export type DelVerseFn = (number: number) => Promise<void>;
export type EditVerseFn = (number: number, verse: Verse) => Promise<void>;

export type EditVerseProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
  onSubmit: EditVerseFn;
  defaultValues: Verse;
};

export type NewVerseProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onSubmit: SubmitFn<CreateVerseData>;
};

export type HeaderProps = {
  showAdd: boolean;
  disableAdd: boolean;
  setShowNewVerse: Dispatch<SetStateAction<boolean>>;
};

export type LyricsProps = {
  song: Song;
  isEditor: boolean;
  verses: {
    add: SubmitFn<CreateVerseData>;
    del: DelVerseFn;
    edit: EditVerseFn;
    loading: number;
  };
};

export type VerseProps = {
  loading: number;
  del: DelVerseFn;
  edit: EditVerseFn;
  verse: Verse;
  isEditor: boolean;
};
