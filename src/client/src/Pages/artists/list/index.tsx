import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { FavoritesProvider, AuthContext } from '../../../Contexts';
import { List, PageLayout } from '../../../Components';
import Api from '../../../Api';

export default function Artists() {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <PageLayout
      title="Artists"
      showHeader={false}
      actions={[
        {
          icon: 'add',
          onClick: () => navigate('create'),
          hidden: !isAuthenticated
        }
      ]}
    >
      <FavoritesProvider>
        <List
          fetchFn={config => Api.artists.fetch({ config })}
          favoriteFn={uid => Api.artists.favorite({ uid })}
          model="artists"
          center={false}
        />
      </FavoritesProvider>
    </PageLayout>
  );
}
