import { useParams } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { useCallback, useContext } from 'react';

import { IAddUser, IDelUser, PageLayout, Table } from '../../../Components';
import { useSong } from '../../../Hooks';
import Api from '../../../Api';
import { Editor } from './types';
import { AuthContext } from '../../../Contexts';

const Settings = () => {
  const { id: uid = '0' } = useParams();

  const { uid: userUID } = useContext(AuthContext);

  const { song, loading, editors } = useSong(uid);

  const fetchEditors = useCallback(
    async (config?: AxiosRequestConfig): Promise<{ data: Editor[] }> => {
      const { data } = await Api.users.fetch({
        config: {
          ...config,
          params: {
            '-uid': userUID,
            ...config?.params
          }
        }
      });

      return {
        data: data.map(user => ({
          ...user,
          isEditor: Boolean(song.editors.includes(user.uid)),
          name: user.username
        }))
      };
    },
    [song.editors, userUID]
  );

  return (
    <PageLayout
      title={!loading ? `${song.name} Settings` : 'Loading...'}
      heading={`${song.name} Settings`}
      loading={loading}
    >
      <Table<Editor>
        fetchFn={fetchEditors}
        actions={[
          { Icon: IAddUser, onClick: editors.add },
          { Icon: IDelUser, onClick: editors.del }
        ]}
        cols={[
          { key: 'username', label: 'Username' },
          { key: 'email', label: 'Email' },
          { key: 'created_at', label: 'User Since', type: 'date' },
          { key: 'isEditor', label: 'Editor', type: 'boolean' }
        ]}
      />
    </PageLayout>
  );
};

export default Settings;
