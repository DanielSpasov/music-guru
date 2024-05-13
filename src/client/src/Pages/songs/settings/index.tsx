import { useParams } from 'react-router-dom';

import { PageLayout } from '../../../Components';
import useSong from '../../../Hooks/useSong';
import UserList from './UserList';

export default function Settings() {
  const { id = '0' } = useParams();

  const {
    song,
    loading,
    loadingEditors,
    availableEditors,
    addEditor,
    delEditor
  } = useSong(id);

  return (
    <PageLayout
      title={!loading ? `"${song.name}" Settings` : 'Loading...'}
      loading={loading}
    >
      <section className="flex justify-evenly w-full">
        <div className="flex flex-col items-center w-1/2 mx-3">
          <h2>All Users</h2>

          <UserList
            items={availableEditors}
            loading={loadingEditors}
            action={addEditor}
            missingMessage="This song has no available editors."
            icon="add-user"
          />
        </div>

        <div className="flex flex-col items-center w-1/2 mx-3">
          <h2>Authorized Editors</h2>

          <UserList
            items={song.editors}
            loading={loadingEditors}
            action={delEditor}
            missingMessage="This song has no editors yet."
            icon="del-user"
          />
        </div>
      </section>
    </PageLayout>
  );
}
