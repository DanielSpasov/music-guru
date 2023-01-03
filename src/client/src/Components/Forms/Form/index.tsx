import { SubmitHandler } from 'react-hook-form/dist/types';
import { useContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Heading, Button, Box } from '../../../Components';
import { ThemeContext } from '../../../Contexts/Theme';
import { errorHandler } from '../../../Handlers';
import { FormSchema } from '../../../Types';

export type FormError = {
  code: string;
  message: string;
  path: string[];
  exact?: boolean;
  inclusive?: boolean;
  minimum?: number;
  type?: string;
};

type FormProps = {
  onSubmit: SubmitHandler<any>;
  schema: FormSchema;
  defaultValues?: any;
  header?: string;
  errors?: FormError[];
  additionalInfo?: JSX.Element;
};

export default function Form({
  header,
  schema,
  onSubmit = () => null,
  defaultValues = {},
  errors = [],
  additionalInfo
}: FormProps) {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { register, handleSubmit } = useForm({ defaultValues });

  const submitFn = useCallback(
    async (e: any) => {
      try {
        setDisableSubmit(true);
        await onSubmit(e);
      } catch (error) {
        errorHandler(error);
      } finally {
        setDisableSubmit(false);
      }
    },
    [onSubmit]
  );

  return (
    <StyledForm onSubmit={handleSubmit(submitFn)} theme={theme}>
      <Heading title={header || 'Form'} />
      {schema.fields.map(field => (
        <field.Component
          key={field.key}
          register={register}
          label={field.label}
          name={field.key}
          type={field?.type}
          required={field?.required}
          error={errors.find(x => x.path.includes(field.key))}
        />
      ))}
      <Box display="flex" justifyContent="space-between">
        <Button variant="danger" type="button" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button variant="primary" type="submit" disabled={disableSubmit}>
          Submit
        </Button>
      </Box>
      {additionalInfo}
    </StyledForm>
  );
}

const StyledForm = styled('form')`
  background-color: ${({ theme: { base } }) => base};
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 15px;
  flex-direction: column;
  border-radius: 10px;
  min-width: 400px;
  padding: 0.75em;
  display: flex;
  margin: auto;
  width: 35%;
  top: 50%;
`;
