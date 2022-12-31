import { Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

export type IRoute = {
  path: string;
  filePath: string;
  private?: boolean;
  routes?: IRoute[];
};

const lazyLoad = (path: string) => lazy(() => import(`/src/${path}`));

const Private = ({
  route,
  isAuth
}: {
  route: JSX.Element;
  isAuth: boolean | null;
}): JSX.Element => (isAuth ? route : <Navigate to="/sign-in" replace />);

export function setupRoute(route: IRoute, isAuth: boolean | null) {
  if (route?.routes) {
    return (
      <Route path={route.path} key={route.path}>
        {route.routes.map((route: IRoute) => setupRoute(route, isAuth))}
      </Route>
    );
  }

  const Page = lazyLoad(route.filePath);
  return (
    <Route
      key={route.path}
      index={route.path === 'index'}
      path={route.path !== 'index' ? route.path : undefined}
      element={
        route.private ? <Private isAuth={isAuth} route={<Page />} /> : <Page />
      }
    />
  );
}
