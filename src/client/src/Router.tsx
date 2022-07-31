import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from './Config/routes.json';
import { IRoute } from './Interfaces';
import pages from './Pages';

const transformRoute = (route: any): IRoute => {
  return {
    title: route?.title || 'Title Forgotten',
    component: route?.component || 'Loader',
    isPrivate: route?.isPrivate || false,
    path: route?.path || '/home',
    children: route?.children || null
  };
};

const renderChildren = (routes: IRoute[]): JSX.Element[] => {
  return routes.map((x: IRoute) => setupRoute(x));
};

const setupRoute = (route: IRoute): JSX.Element => {
  return route.children ? (
    <Route key={route.path} path={route.path}>
      {route.children ? renderChildren(route.children) : null}
    </Route>
  ) : (
    <Route
      key={route.path}
      path={route.path}
      // @ts-ignore
      element={<>{pages[route.component]()}</>}
    >
      {route.children ? renderChildren(route.children) : null}
    </Route>
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={pages.Home()} />
        {routes.map(transformRoute).map((route: IRoute) => setupRoute(route))}
        <Route path="*" element={pages.NotHome()} />
      </Routes>
    </BrowserRouter>
  );
}
