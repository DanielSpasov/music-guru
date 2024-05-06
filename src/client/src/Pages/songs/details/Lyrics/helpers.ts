import { SubmitHandler } from 'react-hook-form';
import { ZodSchema } from 'zod';

import { FormSection } from '../../../../Components/Forms/Form/helpers';
import { Song, Verse } from '../../../../Types/Song';

export type VerseFormSchema = {
  schema: FormSection[];
  validationSchema: ZodSchema;
};

export type DelVerseFn = (number: number) => Promise<void>;
export type AddVerseFn = SubmitHandler<any>;
export type EditVerseFn = (number: number, verse: Verse) => Promise<void>;

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

export type AddVerseProps = {
  onClose: () => void;
  onSubmit: AddVerseFn;
};

export const wrapperLightProps = 'border-neutral-200 border-[1px]';
export const wrapperDarkProps = 'dark:border-none dark:bg-neutral-900';
export const wrapperProps = `${wrapperLightProps} ${wrapperDarkProps}`;
