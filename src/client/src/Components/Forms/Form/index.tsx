import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Loader } from '../../../Components';
import { FormProps, SubmitFn } from './types';

const Form = <T extends FieldValues>({
  onSubmit,
  onClose,
  defaultValues,
  validationSchema,
  header,
  children,
  className,
  additionalContent,
  hideClose = false,
  submitBtn,
  ...props
}: FormProps<T>) => {
  const { handleSubmit, ...formProps } = useForm<T>({
    defaultValues,
    ...(validationSchema ? { resolver: zodResolver(validationSchema) } : {})
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submitFn: SubmitFn<T> = useCallback(
    async data => {
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
        className={`relative bg-neutral-50 dark:bg-neutral-900 rounded-md w-1/2 shadow-sm ${className}`}
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
          {!hideClose && (
            <Button
              variant="secondary"
              onClick={() => (onClose ? onClose() : navigate(-1))}
              type="button"
            >
              Close
            </Button>
          )}
          <Button
            disabled={loading || submitBtn?.disabled}
            variant={submitBtn?.variant || 'primary'}
            {...submitBtn}
          >
            {submitBtn?.label || 'Submit'}
          </Button>
        </div>

        {additionalContent}
      </form>
    </FormProvider>
  );
};

export default Form;
