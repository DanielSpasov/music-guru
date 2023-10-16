import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Calendar, Form, Input, Select } from '../../../../Components';
import { FormError } from '../../../../Components/Forms/Form/helpers';
import { errorHandler } from '../../../../Handlers';
import { CreateSongProps } from './helpers';
import { SongSchema } from '../../helpers';
import Api from '../../../../Api';

export default function CreateSong({ onClose }: CreateSongProps) {
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
        onClose();
        navigate(`/songs/${res.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [onClose, navigate]
  );

  return (
    <Form
      header="Create Song"
      onSubmit={onSubmit}
      onClose={onClose}
      errors={errors}
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
              key: 'image',
              label: 'Image',
              Component: Input,
              props: {
                type: 'file',
                accept: ['image/jpeg', 'image/png']
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
                fetchFn: ({ params }: any) =>
                  Api.artists.fetch({ config: { params } }),
                multiple: true
              }
            }
          ]
        }
      ]}
    />
  );
}
