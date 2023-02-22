import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { SingleSchema } from '../helpers';
import { schema } from './schema';
import Api from '../../../Api';

export default function CreateSingle() {
  const [errors, setErrors] = useState<FormError[]>([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const validData = SingleSchema.parse({
          ...data,
          artist: data.artist[0]
        });
        const res = await Api.singles.post({ body: validData });
        setErrors([]);
        toast.success(`Successfully created single: ${res.name}`);
        navigate(`/singles/${res.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Single" showHeader={false}>
      <Form
        defaultValues={{ artist: [], features: [] }}
        header="Create Single"
        onSubmit={onSubmit}
        schema={schema}
        errors={errors}
      />
    </PageLayout>
  );
}
