import { ComponentType, FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../Contexts';

const AsAuthenticated = <T extends object>(Component: ComponentType<T>) => {
  const WrappedComponent: FC<T> = props => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) return <Component {...props} />;
    return <Navigate to="/sign-in" replace />;
  };

  return WrappedComponent;
};

export default AsAuthenticated;
