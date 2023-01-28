import { createContext, Dispatch, useReducer, useEffect } from 'react';
import Api from '../Api';

export interface IAuth {
  uid: string | null;
  isAuthenticated: boolean | null;
}

type Action = {
  type: 'SIGNUP' | 'SIGNIN' | 'SIGNOUT';
  payload?: any;
};

export interface AuthContextType extends IAuth {
  dispatch: Dispatch<Action>;
}

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

export const defaultAuth = { uid: null, isAuthenticated: null };
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
        dispatch({ type: 'SIGNIN', payload: { uid } });
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
