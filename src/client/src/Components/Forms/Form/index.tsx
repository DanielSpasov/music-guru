import { useContext, useState, FormEvent } from 'react';
import styled from 'styled-components';

import { Heading } from '../../';
import { ThemeContext } from '../../../Contexts/Theme';

type FormProps = {
  onSubmit: Function;
  title?: string;
  children?: any;
  [css: string]: any;
};

export default function Form({
  onSubmit = () => null,
  title,
  children,
  ...css
}: FormProps) {
  const theme = useContext(ThemeContext);
  const [formData, setFormData] = useState({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
    console.log(formData);
  };

  // TODO: Change event type
  const onChange = (event: any) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  return (
    <StyledForm
      onSubmit={handleSubmit}
      onChange={onChange}
      theme={theme}
      {...css}
    >
      <Heading title={title || 'Form'} />
      {children}
    </StyledForm>
  );
}

const StyledForm = styled('form')<any>`
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
