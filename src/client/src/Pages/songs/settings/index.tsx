import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IAddUser, IDelUser, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import { ListUser } from '../../../Types';
import { useSong } from '../../../Hooks';
import Api from '../../../Api';

// Composables
import UserList from './composables/UserList';

const Settings = () => {
  const { id: uid = '0' } = useParams();

  const { uid: userUID } = useContext(AuthContext);

  const { song, loading, editors } = useSong(uid);

  const [availableEditors, setAvailableEditors] = useState<ListUser[]>([]);
  const [loadingEditors, setLoadingEditors] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (song.created_by !== userUID) return;

        setLoadingEditors(true);
        const { data } = await Api.songs.fetchAvailableEditors({
          uid,
          config: { params: { username: '' } }
        });
        setAvailableEditors(data);
      } catch (err) {
        toast.error('Failed to fetch users');
      } finally {
        setLoadingEditors(false);
      }
    })();
  }, [uid, userUID, song.created_by]);

  const handleAddEditor = useCallback(
    async (uid: string) => {
      try {
        setLoadingEditors(true);
        await editors.add(uid);
        setAvailableEditors(prev => prev.filter(user => user.uid !== uid));
      } catch (err) {
        toast.error('Failed to add editor');
      } finally {
        setLoadingEditors(false);
      }
    },
    [editors]
  );

  const handleDelEditor = useCallback(
    async (uid: string) => {
      try {
        setLoadingEditors(true);
        await editors.del(uid);
        const editor = song.editors.find(x => x.uid === uid);
        if (editor) setAvailableEditors(prev => [...prev, editor]);
      } catch (err) {
        toast.error('Failed to remove editor');
      } finally {
        setLoadingEditors(false);
      }
    },
    [editors, song.editors]
  );

  return (
    <PageLayout
      title={!loading ? `${song.name} Settings` : 'Loading...'}
      heading={`${song.name} Settings`}
      loading={loading}
    >
      <section className="flex justify-evenly w-full">
        <div className="flex flex-col items-center w-1/2 mx-3">
          <h2>All Users</h2>

          <UserList
            items={availableEditors}
            loading={loadingEditors}
            action={handleAddEditor}
            missingMessage="This song has no available editors."
            Icon={IAddUser}
          />
        </div>

        <div className="flex flex-col items-center w-1/2 mx-3">
          <h2>Authorized Editors</h2>

          <UserList
            items={song.editors}
            loading={loadingEditors}
            action={handleDelEditor}
            missingMessage="This song has no editors yet."
            Icon={IDelUser}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default Settings;
