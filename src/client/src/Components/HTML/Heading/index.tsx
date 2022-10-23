import styled from 'styled-components';

type HeadingProps = {
  size?: 'small' | 'medium' | 'big';
  title: string;
  [css: string]: any;
};

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
  color: white;
  margin: 10px;
`;

const H2 = styled('h2')<HeadingProps>`
  text-align: center;
  color: white;
  margin: 10px;
`;

const H3 = styled('h3')<HeadingProps>`
  text-align: center;
  color: white;
  margin: 10px;
`;
