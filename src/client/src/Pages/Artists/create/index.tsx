import { useCallback, useState } from 'react';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, PageLayout } from '../../../Components';
import { Artist, artistSchema } from '../helpers';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';
import Api from '../../../Api';

export default function CreateArtist() {
  const [errors, setErrors] = useState<FormError[]>([]);

  const onSubmit = useCallback(async (data: Artist) => {
    try {
      const validData = artistSchema.parse(data);
      const res = await Api.artists.post({ body: validData });
      console.log(res);
      setErrors([]);
    } catch (error) {
      const handledErrors = errorHandler(error);
      setErrors(handledErrors);
    }
  }, []);

  return (
    <PageLayout title="Create Artist" showHeader={false}>
      <Form
        header="Create Artist"
        onSubmit={onSubmit}
        schema={schema}
        errors={errors}
      />
    </PageLayout>
  );
}
