import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, Loader, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { AlbumSchema } from '../helpers';
import { schema } from './schema';
import Api from '../../../Api';

export default function EditAlbum() {
  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: album } = await Api.albums.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });

        const [{ data: artist }, { data: songs }] = await Promise.all([
          Api.artists.get({
            id: album.artist,
            config: { params: { serializer: 'list' } }
          }),
          Api.songs.fetch({
            config: {
              params: {
                serializer: 'list',
                uid__in: album.songs
              }
            }
          })
        ]);

        setDefaultValues({
          ...album,
          artist,
          songs
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
        const validData = AlbumSchema.parse({
          ...data,
          artist: data.artist[0].uid,
          songs: data.songs.map((x: any) => x.uid)
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
