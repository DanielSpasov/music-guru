import { Dispatch, ReactNode } from 'react';

import { User } from '../../Types';

export const defaultAuth = {
  uid: null,
  data: null,
  isAuthenticated: null
};

export type IAuth = {
  uid: string | null;
  data: User | null;
  isAuthenticated: boolean | null;
};

export type ActionType = 'SIGNIN' | 'SIGNOUT' | 'UPDATE';

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
type Update = {
  type: Extract<ActionType, 'UPDATE'>;
  payload: {
    data: User;
  };
};

export type Action = SignOut | SignIn | Update;

export type AuthContextType = IAuth & {
  dispatch: Dispatch<Action>;
};

export type AuthProviderProps = { children: ReactNode };
