import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodObject } from 'zod';

import { errorHandler } from '../../../Handlers';
import { Loader } from '../../../Components';
import { FormProps } from './helpers';
import Section from './Section';

export default function Form({
  header,
  schema,
  onSubmit = () => null,
  defaultValues = {},
  additionalInfo,
  validationSchema,
  onClose,
  showClose = true
}: FormProps) {
  const { handleSubmit, control, setError, setValue, clearErrors } = useForm({
    defaultValues
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateField = useCallback(
    (name: string, value: any) => {
      try {
        const schema = validationSchema as ZodObject<any>;
        schema?.shape?.[name]?.parse?.(value);
        clearErrors(name);
      } catch (err) {
        const [error] = errorHandler(err);
        setError(name, error);
      }
    },
    [validationSchema, clearErrors, setError]
  );

  const submitFn = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        const validData = validationSchema?.parse(data);
        await onSubmit(validData);
      } catch (error) {
        const errors = errorHandler(error);
        errors.forEach((error: any) => setError(error.path[0], error));
      } finally {
        setLoading(false);
      }
    },
    [onSubmit, setError, validationSchema]
  );

  const closeFn = useCallback(
    (props: any) => {
      if (onClose) onClose(props);
      else navigate(-1);
    },
    [onClose, navigate]
  );

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      encType="multipart/form-data"
      className="relative flex flex-col justify-between h-full"
    >
      {loading && (
        <div className="absolute w-full h-full z-50">
          <div className="absolute w-full h-full bg-black opacity-75" />
          <Loader size="sm" />
        </div>
      )}

      <article className="p-4">
        <h3 className="text-center">{header}</h3>
        {schema.map(section => (
          <Section
            control={control}
            setValue={setValue}
            validateField={validateField}
            key={section.key}
            title={section.title}
            fields={section.fields}
          />
        ))}
      </article>

      <div className="flex justify-end gap-4 p-4">
        {showClose && (
          <button
            className="bg-secondary dark:bg-secondary-dark"
            type="button"
            onClick={closeFn}
          >
            Close
          </button>
        )}
        <button
          className="bg-primary dark:bg-primary-dark"
          type="submit"
          disabled={loading}
        >
          Submit
        </button>
      </div>

      {additionalInfo}
    </form>
  );
}
