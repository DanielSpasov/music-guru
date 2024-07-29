import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, useContext, useMemo } from 'react';

import { attachComponents, IRoute } from './helpers';
import { AuthContext } from '../Contexts/Auth';
import { Loader } from '../Components';

import routesConfig from './routes.json';

const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const routes = useMemo(() => attachComponents(routesConfig), []);

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
      <Routes>
        {routes.map(x => setupRoute(x, Boolean(isAuthenticated)))}
      </Routes>
    </Suspense>
  );
};

const setupRoute = (route: IRoute, isAuthenticated: boolean) => {
  if (route?.routes) {
    return (
      <Route key={route.path} path={route.path}>
        {route.routes.map(x => setupRoute(x, isAuthenticated))}
      </Route>
    );
  }

  return (
    <Route
      key={route.path}
      index={route.path === 'index'}
      path={route.path !== 'index' ? route.path : undefined}
      element={
        route.private && !isAuthenticated ? (
          <Navigate to="/sign-in" replace />
        ) : (
          <route.Component />
        )
      }
    />
  );
};

export default Router;
