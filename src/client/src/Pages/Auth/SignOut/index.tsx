import { PageLayout } from '../../../Components';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Contexts/Auth';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('AUTH');
    setAuth({ isAuthenticated: false, uid: null });
    navigate('/');
  }, [setAuth, navigate]);

  return <PageLayout title=""></PageLayout>;
}
