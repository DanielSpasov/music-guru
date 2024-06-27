import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { IPlus, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import Api from '../../../Api';

export default function Artists() {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <PageLayout
      title="Artists"
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
        fetchFn={config => Api.artists.fetch({ config })}
        favoriteFn={uid => Api.artists.favorite({ uid })}
        model="artists"
        center={false}
      />
    </PageLayout>
  );
}
