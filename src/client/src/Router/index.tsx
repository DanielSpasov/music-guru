import { Routes, Route } from 'react-router-dom';

import { IRoute } from '../Interfaces';
import routes from './routes.json';
import pages from '../Pages';

const transformRoute = (route: any): IRoute => {
  return {
    component: route?.component || 'NotFound',
    isPrivate: route.hasOwnProperty('isPrivate') ? route.isPrivate : false,
    path: route?.path || '/home',
    children: route?.children || null
  };
};

const renderChildren = (routes: IRoute[]): JSX.Element[] => {
  return routes.map(transformRoute).map((x: IRoute) => setupRoute(x));
};

const setupRoute = (route: IRoute): JSX.Element => {
  const component = !!pages[route.component]
    ? pages[route.component]()
    : pages.NotFound();
  return route.children ? (
    <Route key={route.path} path={route.path}>
      {route.children ? renderChildren(route.children) : null}
    </Route>
  ) : (
    <Route key={route.path} path={route.path} element={component}>
      {route.children ? renderChildren(route.children) : null}
    </Route>
  );
};

export default function Router() {
  return (
    <Routes>
      <Route index element={pages.Home()} />
      {routes.map(transformRoute).map((route: IRoute) => setupRoute(route))}
      <Route path="*" element={pages.NotFound()} />
    </Routes>
  );
}
