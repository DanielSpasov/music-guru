import { VerseSchema } from '../../../../../Validations/Song';
import { editVerseSchema, wrapperProps } from './helpers';
import { Form, Icon } from '../../../../../Components';
import { EditVerseProps } from '../helpers';

export default function EditVerse({
  setShow,
  onSubmit,
  defaultValues
}: EditVerseProps) {
  return (
    <div className={`mt-4 rounded-md ${wrapperProps}`}>
      <div className="flex justify-between pt-3 px-3">
        <h3>Edit Verse</h3>
        <Icon
          model="close"
          onClick={() => setShow(false)}
          className="w-8 right-0"
        />
      </div>

      <Form
        schema={editVerseSchema}
        validationSchema={VerseSchema}
        showClose={false}
        defaultValues={defaultValues}
        onSubmit={formData => {
          onSubmit(defaultValues.number, formData);
          setShow(false);
        }}
      />
    </div>
  );
}
