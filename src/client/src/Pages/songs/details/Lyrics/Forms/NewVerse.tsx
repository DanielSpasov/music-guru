import { VerseSchema } from '../../../../../Validations/Song';
import { newVerseSchema, wrapperProps } from './helpers';
import { Form, Icon } from '../../../../../Components';
import { NewVerseProps } from '../helpers';

export default function NewVerse({ show, setShow, onSubmit }: NewVerseProps) {
  if (!show) return null;
  return (
    <div className={`mt-4 rounded-md ${wrapperProps}`}>
      <div className="flex justify-between pt-3 px-3">
        <h3>New Verse</h3>
        <Icon
          model="close"
          onClick={() => setShow(false)}
          className="w-8 right-0"
        />
      </div>

      <Form
        showClose={false}
        schema={newVerseSchema}
        validationSchema={VerseSchema}
        onSubmit={formData => {
          onSubmit(formData);
          setShow(false);
        }}
      />
    </div>
  );
}
