import { useContext, useEffect, useState } from 'react';

import { ILock, IUser, PageLayout, Details } from '../../../Components';
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
            <IUser className="h-16 w-16 [&>path]:text-primary dark:[&>path]:text-primary-dark" />
            <Details label="Information" open>
              {infoConfig.map((data, i) => (
                <Option data={data} key={i} setUser={setUser} user={user} />
              ))}
            </Details>
          </div>

          <div className="flex items-start m-3">
            <ILock className="h-16 w-16 [&>path]:text-primary dark:[&>path]:text-primary-dark" />
            <Details label="MFA" open>
              {getMFAConfig(user).map((data, i) => (
                <Option data={data} key={i} setUser={setUser} user={user} />
              ))}
            </Details>
          </div>
        </>
      )}
    </PageLayout>
  );
}
