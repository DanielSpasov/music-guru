import { useContext, useEffect, useState } from 'react';

import { ILock, IUser, PageLayout, Details } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { User } from '../../../Types';
import Api from '../../../Api';
import Option from './Option';

const Settings = () => {
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
    <PageLayout
      title={user?.username || ''}
      heading={user?.username}
      loading={loading}
    >
      {user && (
        <>
          <div className="flex items-start m-3">
            <IUser
              color="[&>path]:fill-primary dark:[&>path]:fill-primary-dark"
              className="h-16 w-16"
            />
            <Details label="Information" open>
              <Option
                data={{
                  field: 'uid',
                  label: 'UID',
                  type: 'string'
                }}
                setUser={setUser}
                user={user}
              />
              <Option
                data={{
                  field: 'email',
                  label: 'Email',
                  type: 'string'
                }}
                setUser={setUser}
                user={user}
              />
              <Option
                data={{
                  field: 'username',
                  label: 'Username',
                  type: 'string',
                  editable: true
                }}
                setUser={setUser}
                user={user}
              />
              <Option
                data={{
                  field: 'created_at',
                  label: 'Date Created',
                  type: 'date'
                }}
                setUser={setUser}
                user={user}
              />
            </Details>
          </div>

          <div className="flex items-start m-3">
            <ILock
              color="[&>path]:fill-primary dark:[&>path]:fill-primary-dark"
              className="h-16 w-16"
            />
            <Details label="MFA" open>
              <Option
                data={{
                  field: 'verified',
                  label: 'Verified Email',
                  type: 'boolean',
                  action: {
                    label: 'Send Email',
                    hide: user.verified,
                    onClick: () => Api.users.reSendValidationEmail()
                  }
                }}
                setUser={setUser}
                user={user}
              />
              <Option
                data={{
                  field: 'verified',
                  label: 'Email 2FA',
                  type: 'boolean'
                }}
                setUser={setUser}
                user={user}
              />
              <Option
                data={{
                  field: 'verified',
                  label: 'Phone Number',
                  type: 'boolean'
                }}
                setUser={setUser}
                user={user}
              />
              <Option
                data={{
                  field: 'verified',
                  label: 'Google Authenticator',
                  type: 'boolean'
                }}
                setUser={setUser}
                user={user}
              />
            </Details>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default Settings;
