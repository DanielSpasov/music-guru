import { createGlobalStyle } from 'styled-components';
import { Theme } from './Components/Core/ThemeSwitcher/helpers';

export const GlobalCSS = createGlobalStyle<{ theme: Theme }>`
  * {
    font-family: 'Maven Pro', sans-serif;
  }

  body {
    background-color: ${({ theme: { colors } }) => colors.base};
    box-sizing: border-box;
    margin: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme: { colors } }) => colors.baseLighter};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme: { colors } }) => colors.baseLightest};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme: { colors } }) => colors.primary};
  }
`;
