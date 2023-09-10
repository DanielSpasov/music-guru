import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, Loader, PageLayout } from '../../../Components';
import { Album, AlbumSchema } from '../helpers';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';
import Api from '../../../Api';

export default function EditAlbum() {
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [album, setAlbum] = useState<Album>();
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      ...album,
      artist: [album?.artist]
    }),
    [album]
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.albums.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });
        setAlbum(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const validData = AlbumSchema.parse({
          ...data,
          artist: data.artist[0]
        });
        const { data: updated } = await Api.albums.patch({
          id,
          body: validData
        });
        setErrors([]);
        toast.success(
          `Successfully updated information about album: ${updated.name}`
        );
        navigate(`/albums/${updated.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate, id]
  );

  return (
    <PageLayout title="Edit Album" showHeader={false}>
      {loading ? (
        <Loader rainbow fullscreen />
      ) : (
        <Form
          defaultValues={defaultValues}
          header="Edit Album"
          onSubmit={onSubmit}
          schema={schema}
          errors={errors}
        />
      )}
    </PageLayout>
  );
}
