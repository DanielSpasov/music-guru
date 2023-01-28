import { useCallback, useState, useEffect, useRef } from 'react';

import { defaultAuth } from '../Contexts/Auth';
import { SignInSchema, SignUpSchema, User } from '../Types';
import { errorHandler } from '../Handlers';
import Api from '../Api';

export default function useAuth() {
  const [auth, setAuth] = useState(defaultAuth.auth);
  const [loading, setLoading] = useState<boolean>(defaultAuth.loading);

  console.log('rerender', auth);

  const firstRender = useRef<boolean>(true);
  useEffect(() => {
    if (!firstRender.current) return;
    (async () => {
      try {
        const token = localStorage.getItem('AUTH') || '';
        const { uid } = await Api.user.validateToken(token);
        if (uid) {
          setAuth({ isAuthenticated: true, uid });
          return;
        }

        setAuth({ isAuthenticated: false, uid: null });
      } catch (error) {
        errorHandler(error);
        setAuth({ isAuthenticated: false, uid: null });
      } finally {
        setLoading(false);
        firstRender.current = false;
      }
    })();
  }, []);

  const signIn = useCallback(async (data: Partial<User>) => {
    console.log('in signIn');
    try {
      const user = SignInSchema.parse(data);
      const { token, uid } = await Api.user.signIn(user);
      localStorage.setItem('AUTH', token);
      setAuth({ isAuthenticated: true, uid });
    } catch (error) {
      errorHandler(error);
      setAuth({ isAuthenticated: false, uid: null });
    }
  }, []);

  const signOut = useCallback(() => {
    console.log('in signOut');
    try {
      localStorage.removeItem('AUTH');
      setAuth({ isAuthenticated: false, uid: null });
    } catch (error) {
      errorHandler(error);
      setAuth({ isAuthenticated: false, uid: null });
    }
  }, []);

  const signUp = useCallback(async (data: User) => {
    console.log('in signUp');
    try {
      const user = SignUpSchema.parse(data);
      const { token, uid } = await Api.user.signUp(user);
      localStorage.setItem('AUTH', token);
      setAuth({ isAuthenticated: true, uid });
    } catch (error: any) {
      errorHandler(error);
      setAuth({ isAuthenticated: false, uid: null });
    }
  }, []);

  return {
    setAuth,
    signOut,
    signUp,
    signIn,
    auth,
    loading
  };
}
