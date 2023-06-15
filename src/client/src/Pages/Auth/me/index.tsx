import { useContext, useEffect, useMemo, useState } from 'react';

import { Box, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import OptionMenu from './OptionMenu';
import { User } from '../helpers';
import Api from '../../../Api';

export default function Me() {
  const { uid } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.user.get({ id: uid || '' });
        setUser(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [uid]);

  const information = useMemo(() => {
    if (!user) return [];

    const formattedDate = new Date(user.created_at).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    );

    return [
      { name: 'UID', value: user.uid },
      { name: 'Email', value: user.email },
      { name: 'Username', value: user?.username },
      { name: 'Date Created', value: formattedDate }
    ];
  }, [user]);

  const mfa = useMemo(() => {
    if (!user) return [];
    return [
      { name: 'Verified Email', value: user.verified ? 'Yes' : 'No' },
      { name: 'Email 2FA', value: 'TODO' },
      { name: 'Phone Number', value: 'TODO' },
      { name: 'Google Authenticator', value: 'TODO' }
    ];
  }, [user]);

  return (
    <PageLayout title={user?.username || ''} loading={loading}>
      <Box padding="1em">
        <OptionMenu
          icon={{ model: 'user', type: 'solid' }}
          label="Information"
          data={information}
        />
        <OptionMenu
          icon={{ model: 'lock', type: 'solid' }}
          label="MFA"
          data={mfa}
        />
      </Box>
    </PageLayout>
  );
}
