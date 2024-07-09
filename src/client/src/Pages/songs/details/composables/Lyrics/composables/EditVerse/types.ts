import { Dispatch, SetStateAction } from 'react';

import { Verse } from '../../../../../../../Types';
import { EditVerseFn } from '../../types';

export type EditVerseProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
  onSubmit: EditVerseFn;
  defaultValues: Verse;
};
