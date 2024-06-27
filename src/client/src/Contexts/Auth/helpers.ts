import { Dispatch, ReactNode } from 'react';

export const defaultAuth = {
  uid: null,
  isAuthenticated: null
};

export interface IAuth {
  uid: string | null;
  isAuthenticated: boolean | null;
}

export type Action = {
  type: 'SIGNIN' | 'SIGNOUT';
  payload?: any;
};

export interface AuthContextType extends IAuth {
  dispatch: Dispatch<Action>;
}

export type AuthProviderProps = { children: ReactNode };
