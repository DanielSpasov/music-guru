import { ComponentType, Suspense, useContext, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loader, AsAuthenticated, AsOwner, AsEditor } from '../Components';
import { IConfigRoute, IRoute, ProtectionLevel } from './types';
import { AuthContext } from '../Contexts/Auth';
import { Components } from './components';

import routesConfig from './routes.json';

const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const routes = useMemo(() => {
    const attachComponents = (routes: IConfigRoute[]): IRoute[] => {
      return routes.map(route => {
        const attachedRoute: IRoute = {
          path: route.path,
          protection: route.protection,
          Component: Components[route.componentName as keyof typeof Components]
        };

        if (route?.routes) {
          attachedRoute.routes = attachComponents(route.routes);
        }

        return attachedRoute;
      });
    };

    return attachComponents(routesConfig as IConfigRoute[]);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex align-center">
        <Loader type="vinyl" size="lg" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen flex align-center">
          <Loader type="vinyl" size="lg" />
        </div>
      }
    >
      <Routes>{routes.map(setupRoute)}</Routes>
    </Suspense>
  );
};

const protectionLevel: Record<
  Exclude<ProtectionLevel, 'none'>,
  (Component: ComponentType) => ComponentType
> = {
  auth: AsAuthenticated,
  editor: AsEditor,
  owner: AsOwner
};

const setupRoute = (route: IRoute) => {
  if (route?.routes) {
    return (
      <Route key={route.path} path={route.path}>
        {route.routes.map(x => setupRoute(x))}
      </Route>
    );
  }

  const Element =
    route.protection === 'none'
      ? route.Component
      : protectionLevel[route.protection](route.Component);

  return (
    <Route
      key={route.path}
      index={route.path === 'index'}
      path={route.path !== 'index' ? route.path : undefined}
      element={<Element />}
    />
  );
};

export default Router;
