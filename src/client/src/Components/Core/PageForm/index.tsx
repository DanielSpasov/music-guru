import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { PageFormProps } from './helpers';
import PageLayout from '../PageLayout';
import { Form } from '../../Forms';

const darkProps = 'dark:bg-neutral-950 dark:shadow-neutral-950';
const lightProps = 'bg-white shadow-neutral-300';
const themeProps = `${darkProps} ${lightProps}`;

export default function PageForm({ schema, ctx = {} }: PageFormProps) {
  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!schema?.fetchDefaultData) return;
        const defaultData = await schema.fetchDefaultData({ toast, params });
        setDefaultValues(defaultData);
      } finally {
        setLoading(false);
      }
    })();
  }, [schema, params]);

  const _onSubmit = useCallback(
    async (formData: Record<string, any>) => {
      try {
        await schema.onSubmit({ formData, toast, navigate, params, ctx });
      } catch (error) {
        toast.error('Failed to submit form');
      }
    },
    [navigate, schema, params, ctx]
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
