import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../../../Contexts/Auth';
import { PageLayout } from '../../../Components';

export default function SignOut() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('AUTH');
    setAuth({ isAuthenticated: false, uid: null });
    navigate(-1);
  }, [setAuth, navigate]);

  return <PageLayout title=""></PageLayout>;
}
