import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../../Components/Forms/Form/helpers';
import { Form, Input } from '../../../../Components';
import { Artist, ArtistSchema } from '../../helpers';
import { errorHandler } from '../../../../Handlers';
import { CreateArtistProps } from './helpers';
import Api from '../../../../Api';

export default function CreateArtist({ onClose }: CreateArtistProps) {
  const [errors, setErrors] = useState<FormError[]>([]);

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: Artist) => {
      try {
        const validData = ArtistSchema.parse(data);
        const res = await Api.artists.post({
          body: validData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        setErrors([]);
        toast.success(`Successfully created artist: ${res.name}`);
        onClose();
        navigate(`/artists/${res.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [onClose, navigate]
  );

  return (
    <Form
      header="Create Artist"
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
