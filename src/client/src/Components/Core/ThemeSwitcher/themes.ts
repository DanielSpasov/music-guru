import { Theme } from './helpers';

const staticColors = {
  success: 'rgb(77, 217, 91)',
  danger: 'rgb(237, 61, 48)',
  warning: 'rgb(242, 174, 65)',
  info: 'rgb(24, 135, 232)'
};

const light: Theme = {
  name: 'light',
  colors: {
    ...staticColors,
    text: 'black',
    primary: '#2378c3',
    secondary: '#73b3e7',
    base: '#919191',
    baseLight: '#c9c9c9',
    baseLighter: '#f3f3f3',
    baseLightest: '#f9f9f9'
  }
};

const darkPurple: Theme = {
  name: 'dark',
  colors: {
    ...staticColors,
    text: 'white',
    primary: '#cc41ff',
    secondary: '#05bbaa',
    base: '#1b1b1b',
    baseLight: '#2e2e2e',
    baseLighter: '#454545',
    baseLightest: '#5c5c5c'
  }
};

const darkRed: Theme = {
  name: 'dark',
  colors: {
    ...staticColors,
    text: 'white',
    primary: '#E53265',
    secondary: '#28ACF6',
    base: '#1b1b1b',
    baseLight: '#2e2e2e',
    baseLighter: '#454545',
    baseLightest: '#5c5c5c'
  }
};

const themes = {
  light,
  dark: darkPurple,
  darkRed
};

export default themes;
