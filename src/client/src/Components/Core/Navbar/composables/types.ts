import {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode
} from 'react';

export type CategoryProps = {
  children?: ReactNode;
  separate?: boolean | null;
} & HTMLAttributes<HTMLDivElement>;

export type DropdownLinkProps = {
  'data-testid'?: string;
  hide?: boolean | null;
  isActive?: boolean;
  Icon: ElementType;
  label: string;
  to: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
