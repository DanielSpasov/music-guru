import { ButtonVariant } from './types';

// All variants CSS
const defaultProps = 'flex items-center outline-none focus:opacity-60';

// Primary CSS
const primaryDarkProps = 'dark:bg-primary-dark';
const primaryHoverProps = 'hover:opacity-70';
const primaryDisabledProps = 'disabled:opacity-60';
const primaryProps = `${primaryDarkProps} ${primaryHoverProps} ${primaryDisabledProps}`;

// Secondary CSS
const secondaryDarkProps = 'dark:bg-secondary-dark';
const secondaryHoverProps = 'hover:opacity-70';
const secondaryDisabledProps = 'disabled:opacity-60';
const secondaryProps = `${secondaryDarkProps} ${secondaryHoverProps} ${secondaryDisabledProps}`;

// Outline CSS
const outlineDarkProps =
  'dark:shadow-md dark:bg-transparent dark:border-neutral-900';

const outlineLightChildrenProps =
  '[&>*]:text-primary [&>svg>path]:fill-primary';
const outlineDarkChildrenProps =
  'dark:[&>*]:text-white dark:[&>svg>path]:fill-white';
const outlineChildrenProps = `${outlineLightChildrenProps} ${outlineDarkChildrenProps}`;

const outlineLightHoverProps =
  'hover:bg-primary [&>*]:hover:text-white [&>svg>path]:hover:fill-white';
const outlineHoverDarkProps = 'dark:hover:bg-neutral-900';
const outlineHoverProps = `${outlineLightHoverProps} ${outlineHoverDarkProps}`;

const outlineLightDisabledProps =
  'disabled:opacity-60 disabled:bg-transparent [&>*]:disabled:text-primary [&>svg>path]:disabled:fill-primary';
const outlineDarkDisabledProps = 'dark:disabled:bg-transparent';
const outlineDisabledProps = `${outlineLightDisabledProps} ${outlineDarkDisabledProps}`;

const outlineProps = `${outlineDarkProps} ${outlineHoverProps} ${outlineChildrenProps} ${outlineDisabledProps}`;

// All variants
export const variants: Record<ButtonVariant, string> = {
  primary: `${defaultProps} ${primaryProps} bg-primary px-3 py-1.5 rounded-lg text-white`,
  secondary: `${defaultProps} ${secondaryProps} bg-secondary px-3 py-1.5 rounded-lg text-white`,
  outline: `${defaultProps} ${outlineProps} border-2 rounded-full py-1 px-3 border-primary`
};
