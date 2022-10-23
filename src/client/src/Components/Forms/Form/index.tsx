import { useContext } from 'react';
import styled from 'styled-components';

import { Heading } from '../../';
import { ThemeContext } from '../../../Contexts/Theme';

export default function Form({
  onSubmit = () => null,
  title,
  children,
  ...css
}: {
  onSubmit: Function;
  title?: string;
  children?: JSX.Element | JSX.Element[];
  [css: string]: any;
}) {
  const theme = useContext(ThemeContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit();
    console.log('In Form');
  };

  return (
    <StyledForm onSubmit={handleSubmit} theme={theme} {...css}>
      <Heading title={title} />
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
`;
