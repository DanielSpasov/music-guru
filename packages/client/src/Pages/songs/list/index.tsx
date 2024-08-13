import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { IPlus, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

const Songs = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <PageLayout
      title="Songs"
      heading="Songs"
      hideFooter
      actions={[
        {
          type: 'button',
          children: (
            <>
              <IPlus />
              New
            </>
          ),
          variant: 'outline',
          onClick: () => navigate('create'),
          hidden: !isAuthenticated
        }
      ]}
    >
      <List
        model="songs"
        fetchFn={config => Api.songs.fetch({ config })}
        favoriteFn={uid => Api.songs.favorite({ uid })}
        skeletonLength={54}
      />
    </PageLayout>
  );
};

export default Songs;
