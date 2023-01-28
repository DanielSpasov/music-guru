import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import { AuthContext } from '../../../Contexts/Auth';
import { PageLayout } from '../../../Components';

export default function SignOut() {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    signOut();
    navigate('/');
  }, [navigate, signOut]);

  return <PageLayout title=""></PageLayout>;
}
