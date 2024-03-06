import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { errorHandler } from '../../../Handlers';
import { PageFormProps } from './helpers';
import PageLayout from '../PageLayout';
import { Form } from '../../Forms';

const darkProps = 'dark:bg-neutral-950 dark:shadow-neutral-950';
const lightProps = 'bg-neutral-200 shadow-neutral-300';
const themeProps = `${darkProps} ${lightProps}`;

export default function PageForm({ schema }: PageFormProps) {
  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!schema?.fetchDefaultData) return;
        const defaultData = await schema.fetchDefaultData();
        setDefaultValues(defaultData);
      } finally {
        setLoading(false);
      }
    })();
  }, [schema]);

  const _onSubmit = useCallback(
    async (formData: Record<string, any>) => {
      try {
        schema.onSubmit({ formData, toast, navigate });
      } catch (error) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [navigate, schema]
  );

  return (
    <PageLayout title={schema.title} showHeader={false} loading={loading}>
      <div className={`rounded-md w-1/2 shadow-md mt-3 m-auto ${themeProps}`}>
        <Form
          defaultValues={defaultValues}
          schema={schema.sections}
          {...schema}
          onSubmit={_onSubmit}
        />
      </div>
    </PageLayout>
  );
}
