import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, Loader, PageLayout } from '../../../Components';
import { Single, SingleSchema } from '../helpers';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';
import Api from '../../../Api';

export default function EditSingle() {
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [single, setSingle] = useState<Single>();
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      ...single,
      artist: [single?.artist]
    }),
    [single]
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.singles.get({
          id,
          config: { params: { populate: 'artist,features' } }
        });
        setSingle(data);
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
        const validData = SingleSchema.parse({
          ...data,
          artist: data.artist[0]
        });
        const { data: updated } = await Api.singles.patch({
          id,
          body: validData
        });
        setErrors([]);
        toast.success(
          `Successfully updated information about single: ${updated.name}`
        );
        navigate(`/singles/${updated.uid}`);
      } catch (error) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate, id]
  );

  return (
    <PageLayout title="Edit Single" showHeader={false}>
      {loading ? (
        <Loader rainbow fullscreen />
      ) : (
        <Form
          defaultValues={defaultValues}
          header="Edit Single"
          onSubmit={onSubmit}
          schema={schema}
          errors={errors}
        />
      )}
    </PageLayout>
  );
}
