import { createContext, useReducer, useEffect } from 'react';

import {
  Action,
  AuthContextType,
  AuthProviderProps,
  defaultAuth,
  IAuth
} from './helpers';
import Api from '../../Api';

function authReducer(state: IAuth, action: Action): IAuth {
  switch (action.type) {
    case 'SIGNIN':
      localStorage.setItem('AUTH', action?.payload?.token);
      return { uid: action?.payload?.uid, isAuthenticated: true };
    case 'SIGNOUT':
      localStorage.removeItem('AUTH');
      return { uid: null, isAuthenticated: false };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthContextType>({
  ...defaultAuth,
  dispatch: () => defaultAuth
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, defaultAuth);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('AUTH') || '';
        const { uid } = await Api.users.validateToken(token);
        dispatch({ type: 'SIGNIN', payload: { uid, token } });
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
}
