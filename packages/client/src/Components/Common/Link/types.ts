import { AnchorHTMLAttributes, ElementType, ReactNode } from 'react';

export type LinkType = 'navlink' | 'link' | 'dropdown-link';

export type NavlinkProps = {
  type: Extract<LinkType, 'navlink'>;
  isActive?: boolean;
};
export type DropdownLinkProps = {
  type: Extract<LinkType, 'dropdown-link'>;
  Icon: ElementType;
  iconColor?: string;
  isActive?: boolean;
  hide?: boolean | null;
};
export type JustLinkProps = {
  type: Extract<LinkType, 'link'>;
};

export type DefaultLinkProps = {
  to: string;
  children: ReactNode;
  'data-testid'?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  DefaultLinkProps &
  (DropdownLinkProps | JustLinkProps | NavlinkProps);
