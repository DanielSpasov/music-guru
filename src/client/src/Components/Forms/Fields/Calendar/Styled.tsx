import styled from 'styled-components';
import { Box } from '../../../HTML';
import { colors, essentials, font } from '../../../helpers';

export const StyledInput = styled('input')<any>`
  border: 2px solid ${({ theme: { colors } }) => colors.baseLighter};
  background-color: ${({ theme: { colors } }) => colors.baseLight};
  color: ${({ theme: { colors } }) => colors.text};
  box-sizing: border-box;
  transition: 0.3s;
  margin: 0.5em 0;
  padding: 0.5em;
  font-size: 1em;
  outline: none;
  width: 100%;

  caret-color: transparent;
  cursor: default;

  ${essentials};
  ${colors};
  ${font};

  &:hover {
    border: 2px solid ${({ theme: { colors } }) => colors.baseLightest};
  }

  &:focus {
    border: 2px solid ${({ theme: { colors } }) => colors.primary};
  }

  &:not(:placeholder-shown) ~ label {
    top: -1.5em;
    left: 0em;
  }
`;

export const StyledCalendar = styled(Box)`
  margin-top: 0.5em;

  /* ~~~ NAVIGATION ~~~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

  /* ~~~ WEEK DAYS ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
    padding: 0.4em 0;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  /* ~~~ BUTTONS ~~~ */
  button {
    background-color: ${({ theme: { colors } }) => colors.baseLight};
    color: ${({ theme: { colors } }) => colors.text};
    border: 1px ${({ theme: { colors } }) => colors.base} solid;
    cursor: pointer;
    padding: 0.5em;

    &:hover {
      background-color: ${({ theme: { colors } }) => colors.baseLighter};
    }
  }

  /* ~~~ DAY GRID ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }
  }

  /* ~~~ NEIGHBORING MONTHS ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme: { colors } }) => colors.secondary};
  }

  /* ~~~ ACTIVE DAY ~~~ */
  .react-calendar__tile--range {
    color: ${({ theme: { colors } }) => colors.primary};
  }

  /* ~~~ MONTHS VIEW ~~~ */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;
