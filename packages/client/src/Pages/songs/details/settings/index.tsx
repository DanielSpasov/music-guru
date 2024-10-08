import { FC, useCallback, useContext } from 'react';
import { AxiosRequestConfig } from 'axios';

import { IPlus, IX, PageLayout, Table } from '../../../../Components';
import { Pagination } from '../../../../Api/crud/types';
import { AuthContext } from '../../../../Contexts';
import { getSidebarLinks } from '../sidebarLinks';
import { Editor, Song } from '../../../../Types';
import { useSong } from '../../../../Hooks';
import Api from '../../../../Api';

const Settings: FC<{ data: Song }> = ({ data }) => {
  const { uid: userUID } = useContext(AuthContext);

  const { editors, song } = useSong(data.uid, data);

  const fetchEditors = useCallback(
    async (
      config?: AxiosRequestConfig
    ): Promise<{ data: Editor[]; pagination: Pagination }> => {
      const { data: users, pagination } = await Api.users.fetch({
        config: {
          ...config,
          params: {
            '-uid': userUID,
            ...config?.params
          }
        }
      });

      return {
        pagination,
        data: users.map(user => ({
          ...user,
          is_editor: Boolean(song.editors.includes(user.uid)),
          name: user.username
        }))
      };
    },
    [userUID, song]
  );

  return (
    <PageLayout
      title={`${data.name} Settings`}
      heading={`${data.name} Settings`}
      links={getSidebarLinks(data.uid)}
      hideFooter
    >
      <Table<Editor>
        fetchFn={fetchEditors}
        allowSorting={['created_at']}
        searchKey="username"
        actions={[
          {
            Icon: IPlus,
            label: 'Add',
            onClick: uid => editors.post([uid]),
            disableFn: item => Boolean(song.editors.includes(item.uid))
          },
          {
            Icon: IX,
            label: 'Remove',
            onClick: uid => editors.patch([uid]),
            disableFn: item => !song.editors.includes(item.uid)
          }
        ]}
        bulkActions={[
          {
            Icon: IPlus,
            label: 'Add',
            onClick: editors.post,
            disableFn: uids => !uids.every(uid => !song.editors.includes(uid))
          },
          {
            Icon: IX,
            label: 'Remove',
            onClick: editors.patch,
            disableFn: uids => uids.some(uid => !song.editors.includes(uid))
          }
        ]}
        cols={[
          { key: 'username', label: 'Username' },
          { key: 'created_at', label: 'User Since', type: 'date' },
          { key: 'is_editor', label: 'Editor', type: 'boolean' }
        ]}
      />
    </PageLayout>
  );
};

export default Settings;
