import { ReactNode } from 'react';

import { Action, Tab } from '../../Core/BreadCrumb/helpers';

export type PageLayoutProps = {
  title: string;
  showNavbar?: boolean;
  showBreadCrumb?: boolean;
  showHeader?: boolean;
  children?: ReactNode;
  actions?: Action[];
  tabs?: Tab[];
  loading?: boolean;
};
