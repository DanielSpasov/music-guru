import { ReactNode } from 'react';

import { Action } from '../../Core/BreadCrumb/helpers';

export type PageLayoutProps = {
  title: string;
  showNavbar?: boolean;
  showBreadCrumb?: boolean;
  showHeader?: boolean;
  children?: ReactNode;
  actions?: Action[];
  loading?: boolean;
};
