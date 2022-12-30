import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useContext } from 'react';

import { AuthContext } from './Contexts/Auth';
import routes from './Config/routes.json';
import { Loader } from './Components';

type IRoute = {
  path: string;
  filePath: string;
  private: boolean;
};

const lazyLoad = (path: string) => lazy(() => import(`./${path}`));

export default function Router() {
  return (
    <Suspense fallback={<Loader fullscreen rainbow />}>
      <Routes>
        {routes.map((route: IRoute) => {
          const Page = lazyLoad(route.filePath);
          return (
            <Route
              index={route.path === 'index'}
              path={route.path !== 'index' ? route.path : undefined}
              key={route.path}
              element={route.private ? <Private route={<Page />} /> : <Page />}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

function Private({ route }: { route: JSX.Element }) {
  const { auth } = useContext(AuthContext);
  if (!auth.isAuthenticated) return <Navigate to="/sign-in" />;
  return route;
}
