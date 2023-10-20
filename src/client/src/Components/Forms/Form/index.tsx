import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  onClose
}: FormProps) {
  const { handleSubmit, control, setError, setValue, clearErrors } = useForm({
    defaultValues
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = useCallback(
    (name: string, value: any) => {
      try {
        validationSchema?.shape?.[name]?.parse?.(value);
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
    <form onSubmit={handleSubmit(submitFn)} encType="multipart/form-data">
      <article>
        <h1 className="text-center text-xl font-bold">{header || 'Form'}</h1>
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

      <div className="flex justify-between">
        <button
          className="bg-secondary py-3 px-4 rounded-md font-bold"
          type="button"
          onClick={closeFn}
        >
          Close
        </button>
        <button
          className="bg-primary py-3 px-4 rounded-md font-bold"
          type="submit"
          disabled={loading}
        >
          {!loading ? 'Submit' : <Loader size="s" />}
        </button>
      </div>

      {additionalInfo}
    </form>
  );
}
