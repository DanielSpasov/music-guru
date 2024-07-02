import { Theme } from '../../../../Contexts';

const lightIconProps = '[&>path]:fill-black';
const darkIconProps = 'dark:[&>path]:fill-white';
export const iconProps = `${lightIconProps} ${darkIconProps}`;

const lightActiveIconProps = '[&>path]:fill-primary';
const darkActiveIconProps = 'dark:[&>path]:fill-primary-dark';
export const activeIconProps = `${lightActiveIconProps} ${darkActiveIconProps}`;

export const activeLabelProps = 'text-primary dark:text-primary-dark';

export const toggleStyles: Record<Theme, string> = {
  dark: 'bg-green-500',
  light: 'bg-neutral-700'
};
export const toggleCirlceStyles: Record<Theme, string> = {
  dark: 'right-1',
  light: 'left-1'
};
