import styled from 'styled-components';
import { useContext } from 'react';

import { ThemeContext } from '../../../Contexts/Theme';
import { Heading, Button } from '../../../Components';
import { FormSchema } from '../../../Types';
import { useForm } from 'react-hook-form';

type FormProps = {
  submitFn: any;
  schema: FormSchema;
  defaultValues: any;
  title?: string;
  [css: string]: any;
};

export default function Form({
  title,
  schema,
  submitFn = () => null,
  defaultValues,
  ...css
}: FormProps) {
  const theme = useContext(ThemeContext);
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <StyledForm onSubmit={handleSubmit(submitFn)} theme={theme} {...css}>
      <Heading title={title || 'Form'} />
      {schema.fields.map(field => (
        <field.Component
          key={field.key}
          register={register}
          label={field.label}
          type={field?.type}
          required={field?.validation?.required}
          minlength={field?.validation?.minlength}
          maxlength={field?.validation?.maxlength}
        />
      ))}
      <Button variant="primary" type="submit">
        {schema.buttonText}
      </Button>
    </StyledForm>
  );
}

const StyledForm = styled('form')<FormProps>`
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
