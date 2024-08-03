import { useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';

import { IPlus, IX, PageLayout, Table } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import { useSong } from '../../../Hooks';
import { Editor } from './types';
import Api from '../../../Api';

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
          {
            Icon: IPlus,
            label: 'Add',
            onClick: editors.add,
            disableFn: item => song.editors.includes(item.uid)
          },
          {
            Icon: IX,
            label: 'Remove',
            onClick: editors.del,
            disableFn: item => !song.editors.includes(item.uid)
          }
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
