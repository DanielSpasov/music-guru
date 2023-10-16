import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../../Components/Forms/Form/helpers';
import { Form, Input, Select } from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { CreateAlbumProps } from './helpers';
import { AlbumSchema } from '../../helpers';
import Api from '../../../../Api';

export default function CreateAlbum({ onClose }: CreateAlbumProps) {
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
        onClose();
        navigate(`/albums/${res.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [onClose, navigate]
  );

  return (
    <Form
      header="Create Album"
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
              key: 'image',
              label: 'Image URL',
              Component: Input,
              props: {
                type: 'file',
                accept: ['image/jpeg', 'image/png']
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
                fetchFn: ({ params }) =>
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
