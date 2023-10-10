import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { AlbumSchema } from '../helpers';
import { schema } from './schema';
import Api from '../../../Api';

export default function CreateAlbum() {
  const [errors, setErrors] = useState<FormError[]>([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const validData = AlbumSchema.parse({
          ...data,
          artist: data.artist[0].uid,
          songs: data.songs.map((x: any) => x.uid)
        });
        const res = await Api.albums.post({
          body: validData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        setErrors([]);
        toast.success(`Successfully created album: ${res.name}`);
        navigate(`/albums/${res.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Album" showHeader={false}>
      <Form
        header="Create Album"
        onSubmit={onSubmit}
        schema={schema}
        errors={errors}
      />
    </PageLayout>
  );
}
