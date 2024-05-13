import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Loader, PageLayout } from '../../../Components';
import Api from '../../../Api';

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = searchParams.get('token') || '';
        const { id } = await Api.users.validateToken(token);
        if (id) {
          const response = await Api.users.validateEmail(id);
          toast.success(response.message);
          navigate('/me');
        }
      } catch (error) {
        toast.info('You can send a new one from your security settings.');
        toast.error('Verification email has expired.');
        navigate('/me');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate, searchParams]);

  return (
    <PageLayout
      title="Verifying Email..."
      showHeader={false}
      showNavbar={false}
    >
      <header className="h-screen flex flex-col items-center justify-center">
        <h2>{loading ? 'Verifying Email' : 'Redirecting'}...</h2>
        <div className="p-12">
          <Loader />
        </div>
      </header>
    </PageLayout>
  );
}
