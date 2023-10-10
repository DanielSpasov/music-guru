import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { SongSchema } from '../helpers';
import { schema } from './schema';
import Api from '../../../Api';

export default function CreateSong() {
  const [errors, setErrors] = useState<FormError[]>([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const validData = SongSchema.parse({
          ...data,
          artist: data.artist?.[0]?.uid,
          features: data?.features?.map((x: any) => x.uid)
        });
        const res = await Api.songs.post({
          body: validData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        setErrors([]);
        toast.success(`Successfully created song: ${res.name}`);
        navigate(`/songs/${res.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Song" showHeader={false}>
      <Form
        header="Create Song"
        onSubmit={onSubmit}
        schema={schema}
        errors={errors}
      />
    </PageLayout>
  );
}
