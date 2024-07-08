import { Form, IX, Input, Textarea } from '../../../../../Components';
import { VerseSchema } from '../../../../../Validations';
import { EditVerseProps } from '../helpers';
import { wrapperProps } from './helpers';

export default function EditVerse({
  setShow,
  onSubmit,
  defaultValues
}: EditVerseProps) {
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
}
