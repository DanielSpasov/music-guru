import { ComponentType, lazy, LazyExoticComponent } from 'react';

export type IRoute = {
  path: string;
  filePath: string;
  Component: LazyExoticComponent<ComponentType>;
  private?: boolean;
  routes?: IRoute[];
};

export type IConfigRoute = {
  path: string;
  filePath: string;
  private?: boolean;
  routes?: IConfigRoute[];
};

// const lazyLoad = (path: string) => lazy(() => import(path));

export const attachComponents = (routes: IConfigRoute[]): IRoute[] => {
  return routes.map(route => {
    const attachedRoute: IRoute = {
      path: route.path,
      filePath: route.filePath,
      private: route.private,
      Component: lazy(() => import('../Pages/home/index'))
      // Component: lazyLoad(
      //   '../Pages'.concat(route.filePath).concat('/index.tsx')
      // )
    };

    if (route?.routes) {
      attachedRoute.routes = attachComponents(route.routes);
    }

    return attachedRoute;
  });
};
