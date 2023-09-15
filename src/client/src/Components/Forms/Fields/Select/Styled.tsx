import ReactSelect, { GroupBase, Props } from 'react-select';
import styled, { keyframes } from 'styled-components';

const Open = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Select = styled(ReactSelect)<Props<any, boolean, GroupBase<any>>>`
  .control--focused,
  .control {
    margin-top: 0.5em;
    border-width: 2px;
    border-radius: 5px;
    box-shadow: none;
    background-color: ${({ theme: { colors } }) => colors.baseLight};
    border-color: ${({ theme: { colors } }) => colors.baseLighter};
  }
  .control--focused {
    border-color: ${({ theme: { colors } }) => colors.primary};
  }
  .control:hover {
    border-color: ${({ theme: { colors } }) => colors.baseLightest};
  }

  .option--selected,
  .option {
    border-radius: 5px;
    background-color: ${({ theme: { colors } }) => colors.base};
  }
  .option--selected,
  .option:hover {
    background-color: ${({ theme: { colors } }) => colors.baseLight};
  }

  .indicatorSeparator {
    background-color: ${({ theme: { colors } }) => colors.baseLightest};
  }

  .clearIndicator:hover,
  .dropdownIndicator:hover {
    color: ${({ theme: { colors } }) => colors.primary};
  }

  .valueContainer {
    padding: 0.1em;
  }

  .multiValue {
    background-color: ${({ theme: { colors } }) => colors.baseLightest};
    padding: 0.2em;
  }

  .label {
    color: ${({ theme: { colors } }) => colors.text};
  }

  .menu {
    background-color: ${({ theme: { colors } }) => colors.base};
    box-shadow: 'rgba(0, 0, 0, 0.45) 0px 0px 5px 3px';
    animation: ${Open} 0.3s ease-in-out;
  }
`;
