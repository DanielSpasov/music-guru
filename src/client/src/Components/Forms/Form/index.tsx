import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Heading, Button, Box, Section, Loader } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { FormProps } from './helpers';

export default function Form({
  header,
  schema,
  onSubmit = () => null,
  defaultValues = {},
  errors = [],
  additionalInfo,
  onClose
}: FormProps) {
  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitFn = useCallback(
    async (e: any) => {
      try {
        setLoading(true);
        await onSubmit(e);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    },
    [onSubmit]
  );

  const closeFn = useCallback(
    (props: any) => {
      if (onClose) onClose(props);
      else navigate(-1);
      reset();
    },
    [onClose, navigate, reset]
  );

  return (
    <StyledForm onSubmit={handleSubmit(submitFn)} encType="multipart/form-data">
      <Box>
        <Heading title={header || 'Form'} size="medium" />
        {schema.map(section => (
          <Section
            key={section.key}
            title={section.title}
            fields={section.fields}
            register={register}
            setFormValue={setValue}
            getValues={getValues}
            errors={errors}
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
