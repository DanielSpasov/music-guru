import { ComponentType, LazyExoticComponent } from 'react';

import { Components } from './components';

export type ProtectionLevel = 'none' | 'auth' | 'owner' | 'editor';

export type IRoute = {
  path: string;
  Component: LazyExoticComponent<ComponentType>;
  protection: ProtectionLevel;
  routes?: IRoute[];
};

export type IConfigRoute = {
  path: string;
  componentName: keyof typeof Components;
  protection: ProtectionLevel;
  routes?: IConfigRoute[];
};
