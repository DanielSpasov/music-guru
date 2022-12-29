import { SubmitHandler } from 'react-hook-form/dist/types';
import { useContext, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { ThemeContext } from '../../../Contexts/Theme';
import { Heading, Button } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { FormSchema } from '../../../Types';

type FormError = {
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
};

export default function Form({
  header,
  schema,
  onSubmit = () => null,
  defaultValues = {},
  errors = []
}: FormProps) {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const theme = useContext(ThemeContext);
  const { register, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange'
  });

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
          type={field?.type}
          required={field?.required}
          error={errors.find(x => x.path.includes(field.key))}
        />
      ))}
      <Button variant="primary" type="submit" disabled={disableSubmit}>
        {header || 'Submit'}
      </Button>
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
