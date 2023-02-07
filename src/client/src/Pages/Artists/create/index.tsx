import { useCallback, useState } from 'react';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';

const imageRequired = {
  code: '400',
  message: 'Image is required',
  path: ['image']
};

export default function CreateArtist() {
  const [errors, setErrors] = useState<FormError[]>([]);

  const onSubmit = useCallback((data: any) => {
    try {
      if (!data.image[0]) {
        setErrors([imageRequired]);
        return;
      }

      console.log(data);

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
