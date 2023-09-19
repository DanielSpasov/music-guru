import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, PageLayout } from '../../../Components';
import { Artist, ArtistSchema } from '../helpers';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';
import Api from '../../../Api';

export default function CreateArtist() {
  const [errors, setErrors] = useState<FormError[]>([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: Artist) => {
      try {
        const validData = ArtistSchema.parse(data);
        const res = await Api.artists.post({
          body: validData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        setErrors([]);
        toast.success(`Successfully created artist: ${res.name}`);
        navigate(`/artists/${res.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate]
  );

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
