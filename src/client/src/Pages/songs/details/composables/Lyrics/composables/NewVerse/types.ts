import { Dispatch, SetStateAction } from 'react';

import { SubmitFn } from '../../../../../../../Components/Forms/Form/types';
import { CreateVerseData } from '../../../../../../../Validations';

export type NewVerseProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onSubmit: SubmitFn<CreateVerseData>;
};
