import { useContext, useEffect, useState } from 'react';

import { infoConfig, getMFAConfig } from './helpers';
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

  return (
    <PageLayout title={user?.username || ''} loading={loading}>
      {user && (
        <Box padding="1em">
          <OptionMenu
            icon="user"
            label="Information"
            config={infoConfig}
            setUser={setUser}
            user={user}
          />
          <OptionMenu
            icon="lock"
            label="MFA"
            config={getMFAConfig(user)}
            setUser={setUser}
            user={user}
          />
        </Box>
      )}
    </PageLayout>
  );
}
