import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { FormError } from '../../../Components/Forms/Form/helpers';
import { Form, Loader, PageLayout } from '../../../Components';
import { Single, singleSchema } from '../helpers';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';
import Api from '../../../Api';

export default function EditSingle() {
  const [defaultData, setDefaultData] = useState<Partial<Single>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<FormError[]>([]);
  const { id = '0' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.singles.get({
          id,
          config: { params: { populate: 'artist' } }
        });
        setDefaultData(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const onSubmit = useCallback(
    async (data: Single) => {
      try {
        const validData = singleSchema.parse(data);
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
          header="Edit Single"
          defaultValues={defaultData}
          onSubmit={onSubmit}
          schema={schema}
          errors={errors}
        />
      )}
    </PageLayout>
  );
}
