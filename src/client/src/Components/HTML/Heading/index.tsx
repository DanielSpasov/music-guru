import styled from 'styled-components';
import { margin, padding, text } from '../../helpers';

import { HeadingProps } from './helpers';

export default function Heading({ size = 'big', title, ...css }: HeadingProps) {
  switch (size) {
    case 'small':
      return <H3 {...css}>{title}</H3>;
    case 'medium':
      return <H2 {...css}>{title}</H2>;
    case 'big':
      return <H1 {...css}>{title}</H1>;
  }
}

const H1 = styled('h1')<HeadingProps>`
  text-align: center;
  transition: 0.3s;
  color: white;
  margin: 10px;

  ${padding};
  ${margin};
  ${text};

  &:hover {
    cursor: ${({ onClick }) => onClick && 'pointer'};
    color: ${({ onClick, theme: { colors } }) => onClick && colors.primary};
  }
`;

const H2 = styled('h2')<HeadingProps>`
  text-align: center;
  transition: 0.3s;
  color: white;
  margin: 10px;

  ${padding};
  ${margin};
  ${text};

  &:hover {
    cursor: ${({ onClick }) => onClick && 'pointer'};
    color: ${({ onClick, theme: { colors } }) => onClick && colors.primary};
  }
`;

const H3 = styled('h3')<HeadingProps>`
  text-align: center;
  transition: 0.3s;
  color: white;
  margin: 10px;

  ${padding};
  ${margin};
  ${text};

  &:hover {
    cursor: ${({ onClick }) => onClick && 'pointer'};
    color: ${({ onClick, theme: { colors } }) => onClick && colors.primary};
  }
`;
