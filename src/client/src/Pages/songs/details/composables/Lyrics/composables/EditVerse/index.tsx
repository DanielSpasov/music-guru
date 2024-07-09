import { FC } from 'react';

import { Form, IX, Input, Textarea } from '../../../../../../../Components';
import { VerseSchema } from '../../../../../../../Validations';
import { EditVerseProps } from './types';
import { wrapperProps } from '../styles';

const EditVerse: FC<EditVerseProps> = ({
  setShow,
  onSubmit,
  defaultValues
}) => {
  return (
    <div className={`mt-4 rounded-md ${wrapperProps}`}>
      <div className="flex justify-between pt-3 px-3">
        <h3>Edit Verse</h3>
        <IX onClick={() => setShow(false)} className="w-8 right-0" />
      </div>

      <Form
        className="w-full"
        validationSchema={VerseSchema}
        defaultValues={defaultValues}
        onSubmit={formData => {
          onSubmit(defaultValues.number, formData);
          setShow(false);
        }}
      >
        <Input name="title" label="Title" required />
        <Textarea name="lyrics" label="Lyrics" required />
      </Form>
    </div>
  );
};

export default EditVerse;
