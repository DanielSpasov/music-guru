import { FC } from 'react';

import { CreateVerseData, VerseSchema } from '../../../../../../../Validations';
import { Form, IX, Input, Textarea } from '../../../../../../../Components';
import { wrapperProps } from '../styles';
import { NewVerseProps } from './types';

const NewVerse: FC<NewVerseProps> = ({ show, setShow, onSubmit }) => {
  if (!show) return null;
  return (
    <div className={`mt-4 rounded-md ${wrapperProps}`}>
      <div className="flex justify-between pt-3 px-3">
        <h3>New Verse</h3>
        <IX onClick={() => setShow(false)} className="w-8 right-0" />
      </div>

      <Form<CreateVerseData>
        validationSchema={VerseSchema}
        className="w-full"
        onSubmit={formData => {
          onSubmit(formData);
          setShow(false);
        }}
      >
        <Input name="title" label="Title" required />
        <Textarea name="lyrics" label="Lyrics" required />
      </Form>
    </div>
  );
};

export default NewVerse;
