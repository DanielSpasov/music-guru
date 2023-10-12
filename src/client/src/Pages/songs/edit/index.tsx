import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, Loader, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { SongSchema } from '../helpers';
import { schema } from './schema';
import Api from '../../../Api';

export default function EditSong() {
  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: song } = await Api.songs.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });

        const [{ data: artist }, { data: features }] = await Promise.all([
          Api.artists.get({
            id: song.artist,
            config: { params: { serializer: 'list' } }
          }),
          Api.artists.fetch({
            config: {
              params: {
                serializer: 'list',
                uid__in: [...song.features, ' ']
              }
            }
          })
        ]);

        setDefaultValues({
          ...song,
          artist,
          features
        });
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
        const validData = SongSchema.parse({
          ...data,
          artist: data.artist[0]?.uid,
          features: data?.features?.map((x: any) => x.uid)
        });
        const { data: updated } = await Api.songs.patch({
          id,
          body: validData
        });
        setErrors([]);
        toast.success(
          `Successfully updated information about song: ${updated.name}`
        );
        navigate(`/songs/${updated.uid}`);
      } catch (error) {
        console.log(error);
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate, id]
  );

  return (
    <PageLayout title="Edit Song" showHeader={false}>
      {loading ? (
        <Loader rainbow fullscreen />
      ) : (
        <Form
          defaultValues={defaultValues}
          header="Edit Song"
          onSubmit={onSubmit}
          schema={schema}
          errors={errors}
        />
      )}
    </PageLayout>
  );
}
