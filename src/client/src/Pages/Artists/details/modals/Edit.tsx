import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input, Loader, Textarea } from '../../../../Components';
import { Artist, EditArtistSchema } from '../../helpers';
import { errorHandler } from '../../../../Handlers';
import { EditArtistProps } from './helpers';
import Api from '../../../../Api';

export default function EditArtist({ onClose, fetchArtist }: EditArtistProps) {
  const [defaultData, setDefaultData] = useState<Partial<Artist>>({});
  const [loading, setLoading] = useState<boolean>(true);
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
    async (body: Artist) => {
      try {
        const { data: updated } = await Api.artists.patch({ id, body });
        toast.success(
          `Successfully updated information about artist: ${updated.name}`
        );
        await fetchArtist();
        onClose();
      } catch (error) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [onClose, fetchArtist, id]
  );

  if (loading) return <Loader size="sm" />;
  return (
    <Form
      validationSchema={EditArtistSchema}
      defaultValues={defaultData}
      header="Edit Artist"
      onSubmit={onSubmit}
      onClose={onClose}
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
                required: {
                  value: true,
                  message: 'Name is required.'
                }
              }
            },
            {
              key: 'bio',
              label: 'Biography',
              Component: Textarea,
              props: {
                type: 'text'
              },
              validations: {
                required: {
                  value: true,
                  message: 'Name is required.'
                }
              }
            }
          ]
        }
      ]}
    />
  );
}
