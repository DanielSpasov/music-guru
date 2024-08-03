import { ComponentType, FC, LazyExoticComponent } from 'react';

import { Components } from './components';

export type HOC = <T extends object>(Component: ComponentType<T>) => FC<T>;

export type ProtectionLevel = 'none' | 'auth' | 'owner' | 'editor';

export type IRoute = {
  path: string;
  Component: LazyExoticComponent<ComponentType<object>>;
  protection: ProtectionLevel;
  routes?: IRoute[];
};

export type IConfigRoute = {
  path: string;
  componentName: keyof typeof Components;
  protection: ProtectionLevel;
  routes?: IConfigRoute[];
};
