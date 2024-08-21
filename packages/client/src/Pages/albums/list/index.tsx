import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { IPlus, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import Api from '../../../Api';

const Albums = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <PageLayout
      title="Albums"
      heading="Albums"
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
        sortingConfig={[
          { key: 'created_at', label: 'Date Added' },
          { key: 'favorites', label: 'Favorites' },
          { key: 'release_date', label: 'Release Date' },
          { key: 'name', label: 'Name' }
        ]}
        fetchFn={config => Api.albums.fetch({ config })}
        favoriteFn={uid => Api.albums.favorite({ uid })}
        model="albums"
      />
    </PageLayout>
  );
};

export default Albums;
