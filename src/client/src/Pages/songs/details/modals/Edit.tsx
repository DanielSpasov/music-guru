import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Calendar, Form, Input, Loader, Select } from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { Artist } from '../../../artists/helpers';
import { EditSongSchema } from '../../helpers';
import { EditSongProps } from './helpers';
import Api from '../../../../Api';

export default function Edit({ onClose, fetchSong }: EditSongProps) {
  const [defaultValues, setDefaultValues] = useState({});
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
        const payload = {
          ...data,
          artist: data.artist[0].uid,
          features: data?.features?.map((x: Partial<Artist>) => x?.uid)
        };
        const { data: updated } = await Api.songs.patch({
          id,
          body: payload
        });
        toast.success(`Successfully updated song: ${updated.name}`);
        await fetchSong();
        onClose();
      } catch (error) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [id, onClose, fetchSong]
  );

  if (loading) return <Loader />;
  return (
    <Form
      validationSchema={EditSongSchema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      header="Edit Song"
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
                required: {
                  value: true,
                  message: 'Name is required.'
                }
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
                required: {
                  value: true,
                  message: 'Name is required.'
                }
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
    />
  );
}
