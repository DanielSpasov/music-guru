import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, useContext, lazy } from 'react';

import { AuthContext } from '../Contexts/Auth';
import { Loader } from '../Components';
import routes from './routes.json';
import { IRoute } from '../Types';

export const lazyLoad = (path: string) => lazy(() => import(`/src/${path}`));

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
