import { Dispatch, ReactNode } from 'react';

import { User } from '../../Types/User';

export const defaultAuth = {
  uid: null,
  data: null,
  isAuthenticated: null
};

export interface IAuth {
  uid: string | null;
  data: User | null;
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
