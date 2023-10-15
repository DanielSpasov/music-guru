import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Calendar, Form, Input, Loader, Select } from '../../../../Components';
import { FormError } from '../../../../Components/Forms/Form/helpers';
import { errorHandler } from '../../../../Handlers';
import { EditSongSchema } from '../../helpers';
import { EditSongProps } from './helpers';
import Api from '../../../../Api';

export default function EditSong({ onClose }: EditSongProps) {
  const [defaultValues, setDefaultValues] = useState({});
  const [errors, setErrors] = useState<FormError[]>([]);
  const [loading, setLoading] = useState(true);

  const { id = '0' } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
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
          artist: [artist],
          features
        });
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const validData = EditSongSchema.parse({
          ...data,
          artist: data.artist[0].uid,
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
        onClose();
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [id, onClose]
  );

  if (loading) return <Loader />;
  return (
    <Form
      header="Edit Song"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      onClose={onClose}
      schema={[
        {
          key: 'fields',
          fields: [
            {
              key: 'name',
              label: 'Name',
              Component: Input,
              props: {
                type: 'text'
              },
              validations: {
                required: true
              }
            },
            {
              key: 'release_date',
              label: 'Release Date',
              Component: Calendar
            },
            {
              key: 'artist',
              label: 'Artist',
              Component: Select,
              props: {
                fetchFn: ({ params }: any) =>
                  Api.artists.fetch({ config: { params } })
              },
              validations: {
                required: true
              }
            },
            {
              key: 'features',
              label: 'Featured Artists',
              Component: Select,
              props: {
                multiple: true,
                fetchFn: ({ params }: any) =>
                  Api.artists.fetch({ config: { params } })
              }
            }
          ]
        }
      ]}
      errors={errors}
    />
  );
}
