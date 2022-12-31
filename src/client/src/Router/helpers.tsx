import { Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

export type IRoute = {
  path: string;
  filePath: string;
  private: boolean;
};

const lazyLoad = (path: string) => lazy(() => import(`/src/${path}`));

const Private = ({
  route,
  isAuth
}: {
  route: JSX.Element;
  isAuth: boolean | null;
}): JSX.Element => (isAuth ? route : <Navigate to="/sign-in" />);

export function setupRoute(route: IRoute, isAuth: boolean | null) {
  const Page = lazyLoad(route.filePath);
  const isIndex = route.path === 'index';
  return (
    <Route
      index={isIndex}
      path={!isIndex ? route.path : undefined}
      key={route.path}
      element={
        route.private ? <Private isAuth={isAuth} route={<Page />} /> : <Page />
      }
    />
  );
}
