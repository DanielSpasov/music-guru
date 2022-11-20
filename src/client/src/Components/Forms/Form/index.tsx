import { ReactNode, useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../Contexts/Theme';
import { Heading, Button } from '../../../Components';
import { FormSchema } from '../../../Types';

type FormProps = {
  submitFn: any;
  schema: FormSchema;
  defaultValues: any;
  title?: string;
  children?: ReactNode;
  [css: string]: any;
};

export default function Form({
  submitFn = () => null,
  schema,
  defaultValues,
  title,
  children,
  ...css
}: FormProps) {
  const theme = useContext(ThemeContext);

  return (
    <StyledForm theme={theme} {...css}>
      <Heading title={title || 'Form'} />
      {schema.fields.map(field => {
        return (
          <field.Component
            key={field.key}
            label={field.label}
            type={field?.type}
            required={field?.validation?.required}
            minlength={field?.validation?.minlength}
            maxlength={field?.validation?.maxlength}
          />
        );
      })}
      <Button variant="primary" type="submit">
        {schema.buttonText}
      </Button>
    </StyledForm>
  );
}

const StyledForm = styled('form')<FormProps>`
  background-color: ${({ backgrondColor, theme: { base } }) =>
    backgrondColor || base};
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 15px;
  flex-direction: column;
  border-radius: 10px;
  min-width: 400px;
  padding: 0.75em;
  display: flex;
  margin: auto;
  width: 35%;
  top: 50%;

  ${css => ({ ...css })}
`;
