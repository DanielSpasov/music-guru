import { LinkType } from './types';

export const styles: Record<LinkType, Record<string, string>> = {
  'dropdown-link': {
    activeLabelProps: 'text-primary dark:text-primary-dark',
    activeIconProps: '[&>path]:fill-primary dark:[&>path]:fill-primary-dark',
    iconProps: '[&>path]:fill-black dark:[&>path]:fill-white'
  },
  navlink: {
    activeProps: 'font-bold text-natural-950 dark:text-primary-dark',
    hoverProps: 'hover:text-primary dark:hover:text-primary-dark',
    defaultProps: 'text-natural-400 dark:text-white'
  },
  link: {
    hoverProps: 'hover:text-primary dark:hover:text-primary-dark'
  }
};
