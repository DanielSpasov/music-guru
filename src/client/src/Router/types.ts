import { ComponentType, LazyExoticComponent } from 'react';
import { Components } from './components';

export type IRoute = {
  path: string;
  Component: LazyExoticComponent<ComponentType>;
  private?: boolean;
  routes?: IRoute[];
};

export type IConfigRoute = {
  path: string;
  componentName: keyof typeof Components;
  private?: boolean;
  routes?: IConfigRoute[];
};
