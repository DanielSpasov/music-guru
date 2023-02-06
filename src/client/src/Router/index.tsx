import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useContext, useMemo } from 'react';

import { AuthContext } from '../Contexts/Auth';
import routesConfig from './routes.json';
import { Loader } from '../Components';
import { attachComponents, IRoute } from './helpers';

export default function Router() {
  const routes = useMemo(() => attachComponents(routesConfig), []);

  return (
    <Suspense fallback={<Loader fullscreen rainbow />}>
      <Routes>{routes.map(setupRoute)}</Routes>
    </Suspense>
  );
}

const setupRoute = (route: IRoute) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (route?.routes) {
    return (
      <Route key={route.path} path={route.path}>
        {route.routes.map(setupRoute)}
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
