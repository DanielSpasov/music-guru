import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import { AuthContext } from '../../../Contexts/Auth';
import { PageLayout } from '../../../Components';
import { toast } from 'react-toastify';

const SignOut = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: 'SIGNOUT' });
    toast.info('Signed out');
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <PageLayout title="Signing Out..." dontSaveRecent hideFooter></PageLayout>
  );
};

export default SignOut;
