import { createContext, useReducer, useEffect } from 'react';

import { Action, AuthContextType, defaultAuth, IAuth } from './helpers';
import Api from '../../Api';

function authReducer(state: IAuth, action: Action): IAuth {
  switch (action.type) {
    case 'SIGNUP':
    case 'SIGNIN':
      localStorage.setItem('AUTH', action?.payload?.token);
      return { uid: action?.payload?.uid, isAuthenticated: true };
    case 'SIGNOUT':
      localStorage.removeItem('AUTH');
      return { uid: null, isAuthenticated: null };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthContextType>({
  ...defaultAuth,
  dispatch: () => ({ uid: null, isAuthenticated: null })
});

export function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer(authReducer, defaultAuth);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('AUTH') || '';
        const { uid } = await Api.user.validateToken(token);
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
