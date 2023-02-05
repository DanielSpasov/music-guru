import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { Loader } from '../Components';
import { IRoute } from './helpers';
import routes from './routes.json';

export default function Router() {
  // TODO: Fix relading when using auth context
  return (
    <Suspense fallback={<Loader fullscreen rainbow />}>
      <Routes>{routes.map(setupRoute)}</Routes>
    </Suspense>
  );
}

const setupRoute = (route: IRoute) => {
  if (route?.routes) {
    return (
      <Route key={route.path} path={route.path}>
        {route.routes.map(setupRoute)}
      </Route>
    );
  }

  const importPath = '../'.concat(route.filePath);
  const Element = lazy(() => import(/* @vite-ignore */ importPath));
  return (
    <Route
      key={route.path}
      index={route.path === 'index'}
      path={route.path !== 'index' ? route.path : undefined}
      // TODO: Private Routes
      element={<Element />}
    />
  );
};
