import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, Loader, PageLayout } from '../../../Components';
import { Song, SongSchema } from '../helpers';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';
import Api from '../../../Api';

export default function EditSong() {
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [song, setSong] = useState<Song>();
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      ...song,
      artist: [song?.artist]
    }),
    [song]
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.songs.get({
          id,
          config: { params: { populate: 'artist,features' } }
        });
        setSong(data);
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
          artist: data.artist[0]
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
