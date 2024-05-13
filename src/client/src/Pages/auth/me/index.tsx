import { useContext, useEffect, useState } from 'react';

import { Icon, PageLayout, Summary } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { getMFAConfig, infoConfig } from './helpers';
import { User } from '../../../Types/User';
import Api from '../../../Api';
import Option from './Option';

export default function Me() {
  const { uid } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await Api.users.get({ id: uid || '' });
        setUser(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [uid]);

  return (
    <PageLayout title={user?.username || ''} loading={loading}>
      {user && (
        <>
          <div className="flex items-start m-3">
            <Icon
              model="user"
              className="h-16 w-16 [&>path]:text-primary dark:[&>path]:text-primary-dark"
            />
            <Summary label="Information" open>
              {infoConfig.map((data, i) => (
                <Option data={data} key={i} setUser={setUser} user={user} />
              ))}
            </Summary>
          </div>

          <div className="flex items-start m-3">
            <Icon
              model="lock"
              className="h-16 w-16 [&>path]:text-primary dark:[&>path]:text-primary-dark"
            />
            <Summary label="MFA" open>
              {getMFAConfig(user).map((data, i) => (
                <Option data={data} key={i} setUser={setUser} user={user} />
              ))}
            </Summary>
          </div>
        </>
      )}
    </PageLayout>
  );
}
