import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Loader, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import Api from '../../../Api';

const VerifyEmail = () => {
  const { dispatch } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = searchParams.get('token') || '';
        const { id } = await Api.users.validateToken(token);
        if (id) {
          const { message, data } = await Api.users.validateEmail(id);
          dispatch({ type: 'UPDATE', payload: { data } });
          toast.success(message);
          navigate('/settings/mfa');
        }
      } catch (error) {
        toast.info('You can send a new one from your security settings.');
        toast.error('Verification email has expired.');
        navigate('/settings/mfa');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate, searchParams, dispatch]);

  return (
    <PageLayout title="Verifying Email..." hideHeader hideNavbar hideSidebar>
      <header className="h-screen flex flex-col items-center justify-center">
        <h2>{loading ? 'Verifying Email' : 'Redirecting'}...</h2>
        <div className="p-12">
          <Loader type="player" />
        </div>
      </header>
    </PageLayout>
  );
};

export default VerifyEmail;
