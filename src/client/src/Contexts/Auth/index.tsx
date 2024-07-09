import { createContext, useReducer, useEffect, FC } from 'react';

import {
  Action,
  AuthContextType,
  AuthProviderProps,
  defaultAuth,
  IAuth
} from './helpers';
import Api from '../../Api';

const authReducer = (state: IAuth, action: Action): IAuth => {
  switch (action.type) {
    case 'SIGNIN':
      localStorage.setItem('AUTH', action?.payload?.token);
      return {
        uid: action?.payload?.uid,
        data: action?.payload?.data,
        isAuthenticated: true
      };
    case 'SIGNOUT':
      localStorage.removeItem('AUTH');
      return { uid: null, isAuthenticated: false, data: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType>({
  ...defaultAuth,
  dispatch: () => defaultAuth
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, defaultAuth);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('AUTH') || '';
        const { uid } = await Api.users.validateToken(token);
        const { data } = await Api.users.get({ id: uid });
        dispatch({ type: 'SIGNIN', payload: { uid, token, data } });
      } catch (error) {
        dispatch({ type: 'SIGNOUT' });
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
