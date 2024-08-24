import { FC, useCallback, useContext, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { IPlus, IX, PageLayout, Table } from '../../../../Components';
import { AuthContext } from '../../../../Contexts';
import { getSidebarLinks } from '../sidebarLinks';
import { Album, Editor } from '../../../../Types';
import Api from '../../../../Api';

const Settings: FC<{ data: Album }> = ({ data }) => {
  const { uid: userUID } = useContext(AuthContext);

  const [editors, setEditors] = useState(data.editors);

  const fetchEditors = useCallback(
    async (config?: AxiosRequestConfig): Promise<{ data: Editor[] }> => {
      const { data: users } = await Api.users.fetch({
        config: {
          ...config,
          params: {
            '-uid': userUID,
            ...config?.params
          }
        }
      });

      return {
        data: users.map(user => ({
          ...user,
          is_editor: Boolean(editors.includes(user.uid)),
          name: user.username
        }))
      };
    },
    [userUID, editors]
  );

  const postEditors = useCallback(
    async (editorsUids: string[]) => {
      try {
        await Api.artists.editors.post({ editorsUids, uid: data.uid });
        setEditors(prev => [...prev, ...editorsUids]);
        toast.success('Editor added sucessfully');
      } catch (err) {
        toast.error('Failed to add editors.');
      }
    },
    [data.uid]
  );

  const patchEditors = useCallback(
    async (editorsUids: string[]) => {
      try {
        await Api.artists.editors.patch({ editorsUids, uid: data.uid });
        setEditors(prev => prev.filter(x => !editorsUids.includes(x)));
        toast.success('Editors removed sucessfully.');
      } catch (err) {
        toast.error('Failed to remove editors.');
      }
    },
    [data.uid]
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
            onClick: uid => postEditors([uid]),
            disableFn: item => Boolean(editors.includes(item.uid))
          },
          {
            Icon: IX,
            label: 'Remove',
            onClick: uid => patchEditors([uid]),
            disableFn: item => !editors.includes(item.uid)
          }
        ]}
        bulkActions={[
          {
            Icon: IPlus,
            label: 'Add',
            onClick: postEditors,
            disableFn: uids => !uids.every(uid => !editors.includes(uid))
          },
          {
            Icon: IX,
            label: 'Remove',
            onClick: patchEditors,
            disableFn: uids => uids.some(uid => !editors.includes(uid))
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
