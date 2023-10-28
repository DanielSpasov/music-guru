import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

import { Form, Input, Textarea } from '../../../../Components';
import { Artist, ArtistSchema } from '../../helpers';
import { errorHandler } from '../../../../Handlers';
import { CreateArtistProps } from './helpers';
import Api from '../../../../Api';

export default function CreateArtist({ onClose }: CreateArtistProps) {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (body: Artist) => {
      try {
        const res = await Api.artists.post({
          body,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success(`Successfully created artist: ${res.name}`);
        onClose();
        navigate(`/artists/${res.uid}`);
      } catch (error) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [onClose, navigate]
  );

  return (
    <Form
      header="Create Artist"
      validationSchema={ArtistSchema}
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
                required: {
                  value: true,
                  message: 'Name is required.'
                }
              }
            },
            {
              key: 'bio',
              label: 'Biography',
              Component: Textarea
            },
            {
              key: 'image',
              label: 'Image',
              Component: Input,
              props: {
                type: 'file',
                accept: ['image/jpeg', 'image/png']
              },
              validations: {
                required: {
                  value: true,
                  message: 'Image is required.'
                }
              }
            }
          ]
        }
      ]}
    />
  );
}
