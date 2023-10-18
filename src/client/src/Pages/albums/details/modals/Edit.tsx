import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormError } from '../../../../Components/Forms/Form/helpers';
import { Form, Input, Loader, Select } from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { EditAlbumSchema } from '../../helpers';
import { EditAlbumProps } from './helpers';
import Api from '../../../../Api';

export default function EditAlbum({ fetchAlbum, onClose }: EditAlbumProps) {
  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);

  const { id = '0' } = useParams();

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
                uid__in: [...album.songs, ' ']
              }
            }
          })
        ]);

        setDefaultValues({
          ...album,
          artist: [artist],
          songs
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
        const validData = EditAlbumSchema.parse({
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
        await fetchAlbum();
        onClose();
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [onClose, fetchAlbum, id]
  );

  if (loading) return <Loader />;
  return (
    <Form
      defaultValues={defaultValues}
      header="Edit Album"
      onSubmit={onSubmit}
      onClose={onClose}
      errors={errors}
      schema={[
        {
          key: 'details',
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
              key: 'songs',
              label: 'Songs',
              Component: Select,
              props: {
                fetchFn: ({ params }) =>
                  Api.songs.fetch({ config: { params } }),
                multiple: true
              },
              validations: {
                required: true
              }
            }
          ]
        }
      ]}
    />
  );
}
