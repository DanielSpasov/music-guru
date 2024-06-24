import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FavoritesProvider, AuthContext } from '../../../Contexts';
import { IPlus, List, PageLayout } from '../../../Components';
import Api from '../../../Api';

export default function Albums() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Albums"
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
      <FavoritesProvider>
        <List
          filtersConfig={[
            {
              key: 'name',
              label: 'Name'
            },
            {
              key: 'artist.name',
              label: 'Artist'
            }
          ]}
          fetchFn={config => Api.albums.fetch({ config })}
          favoriteFn={uid => Api.albums.favorite({ uid })}
          model="albums"
          center={false}
        />
      </FavoritesProvider>
    </PageLayout>
  );
}
