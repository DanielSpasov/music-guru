import { DelVerseFn, EditVerseFn } from '../../types';
import { Verse } from '../../../../../../../Types';

export type VerseProps = {
  loading: number;
  del: DelVerseFn;
  edit: EditVerseFn;
  verse: Verse;
  isEditor: boolean;
};
