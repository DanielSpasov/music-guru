import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Heading, Button, Box, Loader } from '../../../Components';
import { errorHandler } from '../../../Handlers';
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
    <StyledForm onSubmit={handleSubmit(submitFn)} encType="multipart/form-data">
      <Box>
        <Heading title={header || 'Form'} size="medium" />
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
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button variant="secondary" type="button" onClick={closeFn}>
          Close
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {!loading ? 'Submit' : <Loader size="s" />}
        </Button>
      </Box>
      {additionalInfo}
    </StyledForm>
  );
}

const StyledForm = styled('form')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
