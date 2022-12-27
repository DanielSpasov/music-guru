import { createContext, Dispatch, SetStateAction } from 'react';

export interface IAuth {
  uid: string | null;
  isAuthenticated: boolean | null;
}

export type AuthContextType = {
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
  updateAuth: Function;
};

export const defaultAuth = {
  auth: { uid: null, isAuthenticated: null },
  setAuth: () => {},
  updateAuth: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultAuth);
export const AuthProvider = AuthContext.Provider;
