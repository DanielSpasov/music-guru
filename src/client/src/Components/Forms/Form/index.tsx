import { SubmitHandler } from 'react-hook-form/dist/types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useContext } from 'react';
import { camelCase } from 'lodash';

import { ThemeContext } from '../../../Contexts/Theme';
import { FormField, FormSchema } from '../../../Types';
import { Heading, Button } from '../../../Components';

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
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onChange' });

  const validate = (field: FormField) => {
    const values = getValues();
    const key = camelCase(field.key);
    const message = field?.validate ? field.validate(values?.[key]) : '';
    return errors?.[key] || { type: 'custom', message };
  };

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
          error={validate(field)}
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
