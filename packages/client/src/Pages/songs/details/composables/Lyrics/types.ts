import { SubmitFn } from '../../../../../Components/Forms/Form/types';
import { CreateVerseData } from '../../../../../Validations';
import { Song, Verse } from '../../../../../Types';

export type DelVerseFn = (number: number) => Promise<void>;
export type EditVerseFn = (number: number, verse: Verse) => Promise<void>;

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
