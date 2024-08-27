import { LinkType } from './types';

export const styles: Record<LinkType, Record<string, string>> = {
  'dropdown-link': {
    activeLabelProps: 'text-primary dark:text-primary-dark',
    activeIconProps: 'text-primary dark:text-primary-dark',
    iconProps: 'text-black dark:text-white'
  },
  'sidebar-link': {
    activeLabelProps: 'text-primary dark:text-primary-dark',
    activeIconProps: 'text-primary dark:text-primary-dark',
    iconProps: 'text-black dark:text-white'
  },
  navlink: {
    activeProps: 'font-bold text-neutral-950 dark:text-primary-dark',
    hoverProps: 'hover:text-primary dark:hover:text-primary-dark',
    defaultProps: 'text-neutral-400 dark:text-white'
  },
  link: {
    hoverProps: 'hover:text-primary dark:hover:text-primary-dark'
  }
};
