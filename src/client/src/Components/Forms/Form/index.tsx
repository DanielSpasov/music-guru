import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Loader } from '../../../Components';
import { FormProps } from './types';

const Form: FC<FormProps> = ({
  onSubmit = () => null,
  defaultValues = {},
  validationSchema,
  header,
  children,
  className,
  additionalContent,
  ...props
}) => {
  const { handleSubmit, ...formProps } = useForm({
    defaultValues,
    ...(validationSchema ? { resolver: zodResolver(validationSchema) } : {})
  });

  const [loading, setLoading] = useState(false);

  const submitFn = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        await onSubmit(data);
      } catch (err) {
        toast.error('Failed to Submit Form');
      } finally {
        setLoading(false);
      }
    },
    [onSubmit]
  );

  return (
    <FormProvider handleSubmit={handleSubmit} {...formProps}>
      <form
        onSubmit={handleSubmit(submitFn)}
        encType="multipart/form-data"
        className={`relative bg-white dark:bg-neutral-900 rounded-md w-1/2 shadow-sm ${className}`}
        {...props}
      >
        {loading && (
          <div className="absolute flex align-center w-full h-full z-10">
            <div className="absolute w-full h-full bg-neutral-400 dark:bg-neutral-950 opacity-75 rounded-md" />
            <Loader type="vinyl" />
          </div>
        )}

        <article className="p-4">
          <h3>{header}</h3>
          {children}
        </article>

        <div className="flex justify-end gap-4 p-4">
          <Button disabled={loading}>Submit</Button>
        </div>

        {additionalContent}
      </form>
    </FormProvider>
  );
};

export default Form;
