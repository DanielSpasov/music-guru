import { createContext } from 'react';

export type Auth = {
  uid: null | string;
  isAuthenticated: null | boolean;
};

export const AuthContext = createContext<Auth>({
  uid: null,
  isAuthenticated: null
});

export const AuthProvider = AuthContext.Provider;
