import { ComponentType, FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../Contexts';

const AsAuthenticated = (Component: ComponentType) => {
  const WrappedComponent: FC = props => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) return <Component {...props} />;
    return <Navigate to="/sign-in" replace />;
  };

  return WrappedComponent;
};

export default AsAuthenticated;
