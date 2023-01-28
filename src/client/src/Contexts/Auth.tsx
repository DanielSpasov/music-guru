import { createContext, Dispatch, SetStateAction } from 'react';
import useAuth from '../Hooks/useAuth';
import { User } from '../Types';

export interface IAuth {
  uid: string | null;
  isAuthenticated: boolean | null;
}

export type AuthContextType = {
  auth: IAuth;
  loading: boolean;
  setAuth: Dispatch<SetStateAction<IAuth>>;
  signIn: (data: Partial<User>) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
};

export const defaultAuth: AuthContextType = {
  auth: { uid: null, isAuthenticated: null },
  loading: true,
  setAuth: () => {},
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultAuth);
export function AuthProvider({ children }: any) {
  const state = useAuth();
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
