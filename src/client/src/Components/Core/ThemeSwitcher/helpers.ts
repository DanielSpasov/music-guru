import { SetStateAction } from 'react';
import themes from './themes';

export type Themes = keyof typeof themes;
export type Colors = {
  success: string;
  danger: string;
  warning: string;
  info: string;
  text: string;
  primary: string;
  secondary: string;
  base: string;
  baseLight: string;
  baseLighter: string;
  baseLightest: string;
};
export type Theme = {
  name: Themes;
  colors: Colors;
};

export type ThemeProps = {
  theme: Theme;
  onClick: () => SetStateAction<Themes>;
  isActive: boolean;
};
