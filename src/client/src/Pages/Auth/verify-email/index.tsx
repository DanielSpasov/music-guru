import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Box, Header, Loader, PageLayout } from '../../../Components';
import Api from '../../../Api';

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = searchParams.get('token') || '';
        const res = await Api.user.validateToken(token);
        console.log('after', res);
      } catch (error) {
        toast.info('You can send a new email from your security settings.');
        toast.error('Email verification expired.');
        navigate('/');
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
      showBreadCrumb={false}
    >
      <Box
        padding="30vh 0"
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        {loading ? (
          <Header title="Verifying Email..." />
        ) : (
          <Header title="Redirecting..." />
        )}
        <Loader rainbow />
      </Box>
    </PageLayout>
  );
}
