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
  const { register, handleSubmit, setValue, getValues } = useForm({
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

  return (
    <StyledForm onSubmit={handleSubmit(submitFn)} encType="multipart/form-data">
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
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="secondary"
          type="button"
          onClick={onClose ? onClose : () => navigate(-1)}
        >
          Go Back
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
  background-color: ${({ theme: { colors } }) => colors.base};
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 5px;
  flex-direction: column;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 600px;
  min-width: 400px;
  padding: 0.75em;
  display: flex;
  margin: auto;
  width: 35%;
  top: 50%;
`;
