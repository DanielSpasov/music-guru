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

export type ActionType = 'SIGNIN' | 'SIGNOUT';

type SignOut = {
  type: Extract<ActionType, 'SIGNOUT'>;
};
type SignIn = {
  type: Extract<ActionType, 'SIGNIN'>;
  payload: {
    uid: string | null;
    token: string;
    data: User | null;
  };
};

export type Action = SignOut | SignIn;

export interface AuthContextType extends IAuth {
  dispatch: Dispatch<Action>;
}

export type AuthProviderProps = { children: ReactNode };
