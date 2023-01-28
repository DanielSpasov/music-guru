import { Routes } from 'react-router-dom';
import { Suspense, useContext } from 'react';

import { AuthContext } from '../Contexts/Auth';
import { IRoute, setupRoute } from './helpers';
import { Loader } from '../Components';
import routes from './routes.json';

export default function Router() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Suspense fallback={<Loader fullscreen rainbow />}>
      <Routes>
        {routes.map((route: IRoute) => setupRoute(route, isAuthenticated))}
      </Routes>
    </Suspense>
  );
}
