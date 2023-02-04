import { Navigate } from 'react-router-dom';

export type IRoute = {
  path: string;
  filePath: string;
  private?: boolean;
  routes?: IRoute[];
};

export const PrivateRoute = ({
  children,
  isAuth
}: {
  children: any;
  isAuth: boolean | null;
}) => (isAuth ? children : <Navigate to="/sign-in" replace />);
