import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import routes from './Config/routes.json';
import { Loader } from './Components';

type IRoute = {
  path: string;
  filePath: string;
  private: boolean;
};

const getLazyComponent = (path: string) => lazy(() => import(`./${path}`));

export default function Router() {
  console.log('IN ROUTER');
  return (
    <Suspense fallback={<Loader fullscreen rainbow />}>
      <Routes>
        {routes.map((route: IRoute) => {
          const Component = getLazyComponent(route.filePath);
          return (
            <Route
              {...(route.path === 'index'
                ? { index: true }
                : { path: route.path })}
              key={route.path}
              element={<Component />}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}
