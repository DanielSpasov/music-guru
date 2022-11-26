import { SubmitHandler } from 'react-hook-form/dist/types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useContext } from 'react';

import { ThemeContext } from '../../../Contexts/Theme';
import { Heading, Button } from '../../../Components';
import { FormSchema } from '../../../Types';
import { camelCase } from 'lodash';

type FormProps = {
  onSubmit: SubmitHandler<any>;
  schema: FormSchema;
  defaultValues?: any;
  header?: string;
};

export default function Form({
  header,
  schema,
  onSubmit = () => null,
  defaultValues = {}
}: FormProps) {
  const theme = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onBlur' });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} theme={theme}>
      <Heading title={header || 'Form'} />
      {schema.fields.map(field => (
        <field.Component
          key={field.key}
          register={register}
          label={field.label}
          type={field?.type}
          required={field?.required}
          error={errors?.[camelCase(field.key)]}
        />
      ))}
      <Button variant="primary" type="submit">
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
