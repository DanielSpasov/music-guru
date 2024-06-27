import { BaseSyntheticEvent, ReactNode, SVGAttributes } from 'react';

export type SVGProps = {
  viewBox?: string;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: (e: BaseSyntheticEvent) => void;
  'data-testid'?: string;
} & SVGAttributes<HTMLOrSVGElement>;

export const lightProps = '[&>path]:text-primary';
export const darkProps = 'dark:[&>path]:text-neutral-50';

export const lightHoverProps = '[&>path]:hover:text-secondary';
export const darkHoverProps = 'dark:[&>path]:hover:text-primary-dark';
export const hoverProps = `cursor-pointer ${lightHoverProps} ${darkHoverProps}`;

export const disabledProps = `[&>path]:text-neutral-300 dark:[&>path]:text-neutral-500`;
