import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, Loader, PageLayout } from '../../../Components';
import { Artist, artistSchema } from '../helpers';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';
import Api from '../../../Api';

export default function EditArtist() {
  const [defaultData, setDefaultData] = useState<Partial<Artist>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const { data } = await Api.artists.get({ id });
        setDefaultData(data);
      } catch (error) {
        console.error('Failed to fetch default values.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = useCallback(
    async (data: Artist) => {
      try {
        if (!id) return;
        const validData = artistSchema.parse(data);
        const { data: updated } = await Api.artists.patch({
          id,
          body: validData
        });
        setErrors([]);
        toast.success(
          `Successfully updated information about artist: ${updated.name}`
        );
        navigate(`/artists/${updated.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate, id]
  );

  return (
    <PageLayout title="Edit Artist" showHeader={false}>
      {loading ? (
        <Loader rainbow fullscreen />
      ) : (
        <Form
          header="Edit Artist"
          defaultValues={defaultData}
          onSubmit={onSubmit}
          schema={schema}
          errors={errors}
        />
      )}
    </PageLayout>
  );
}
