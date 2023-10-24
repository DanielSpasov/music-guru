import { StylesConfig } from 'react-select';
import { Theme } from '../../../../Contexts';

export type SelectProps = {
  fetchFn: (props: any) => any;
  multiple?: boolean;
};

export const styles = (theme: Theme): StylesConfig => {
  const colors = {
    dark: {
      bg: {
        60: '#737373',
        70: '#525252',
        80: '#262626',
        90: '#171717'
      },
      primary: '#E53265',
      text: 'white',
      shadow: 'rgba(0, 0, 0, 0.45) 0px 0px 5px 3px',
      selected: '#171717'
    },
    light: {
      bg: {
        60: '#D4D4D4',
        70: '#E5E5E5',
        80: '#F5F5F5',
        90: '#E5E5E5'
      },
      primary: '#3C82F6',
      text: 'black',
      shadow: 'rgba(149, 157, 165, 0.45) 0px 8px 24px',
      selected: 'black'
    }
  };

  return {
    control: (base, state) => ({
      ...base,
      transition: '200ms',
      marginTop: '0.5em',
      borderWidth: '2px',
      borderRadius: '5px',
      boxShadow: 'none',
      backgroundColor: colors[theme].bg[80],
      borderColor: state.isFocused
        ? colors[theme].primary
        : colors[theme].bg[70],
      '&:hover': {
        borderColor: state.isFocused
          ? colors[theme].primary
          : colors[theme].bg[60]
      }
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: '4px',
      backgroundColor: state.isSelected
        ? colors[theme].bg[80]
        : colors[theme].bg[90],
      color: colors[theme].text,
      '&:hover': { backgroundColor: colors[theme].bg[80] }
    }),
    indicatorSeparator: base => ({
      ...base,
      backgroundColor: colors[theme].bg[70]
    }),
    clearIndicator: base => ({ ...base, cursor: 'pointer' }),
    dropdownIndicator: base => ({ ...base, cursor: 'pointer' }),
    valueContainer: base => ({ ...base, padding: '4px' }),
    multiValue: base => ({
      ...base,
      backgroundColor: colors[theme].bg[70]
    }),
    multiValueLabel: base => ({
      ...base,
      color: colors[theme].text,
      padding: '.2em'
    }),
    singleValue: base => ({
      ...base,
      color: colors[theme].text,
      paddingLeft: '.25em'
    }),
    menu: base => ({
      ...base,
      backgroundColor: colors[theme].bg[90],
      boxShadow: colors[theme].shadow
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      '&>svg': { fill: 'white' },
      '&:hover': { backgroundColor: state.theme.colors.danger }
    })
  };
};
