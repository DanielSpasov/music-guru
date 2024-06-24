import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { IPlus, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

export default function Songs() {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <PageLayout
      title="Songs"
      actions={[
        {
          type: 'button',
          children: (
            <>
              <IPlus />
              <p>New</p>
            </>
          ),
          variant: 'outline',
          onClick: () => navigate('create'),
          hidden: !isAuthenticated
        }
      ]}
    >
      <List
        center={false}
        fetchFn={config => Api.songs.fetch({ config })}
        model="songs"
        skeletonLength={54}
      />
    </PageLayout>
  );
}
