import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormError } from '../../../../Components/Forms/Form/helpers';
import { Form, Input, Loader } from '../../../../Components';
import { Artist, EditArtistSchema } from '../../helpers';
import { errorHandler } from '../../../../Handlers';
import { EditArtistProps } from './helpers';
import Api from '../../../../Api';

export default function EditArtist({ onClose, fetchArtist }: EditArtistProps) {
  const [defaultData, setDefaultData] = useState<Partial<Artist>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);
  const { id = '0' } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.artists.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });
        setDefaultData(data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = useCallback(
    async (data: Artist) => {
      try {
        const validData = EditArtistSchema.parse(data);
        const { data: updated } = await Api.artists.patch({
          id,
          body: validData
        });
        setErrors([]);
        toast.success(
          `Successfully updated information about artist: ${updated.name}`
        );
        await fetchArtist();
        onClose();
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [onClose, fetchArtist, id]
  );

  if (loading) return <Loader />;
  return (
    <Form
      defaultValues={defaultData}
      header="Edit Artist"
      onSubmit={onSubmit}
      onClose={onClose}
      errors={errors}
      schema={[
        {
          key: 'filter',
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
            }
          ]
        }
      ]}
    />
  );
}
