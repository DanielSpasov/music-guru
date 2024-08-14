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
        filtersConfig={[
          {
            key: 'name',
            label: 'Name',
            placeholder: 'Album name...'
          },
          {
            key: 'artist.name',
            label: 'Artist',
            placeholder: 'Artist name...'
          }
        ]}
        sortingConfig={[
          { key: 'created_at', label: 'Latest' },
          { key: 'name', label: 'Name' },
          { key: 'release_date', label: 'Release Date' }
        ]}
        fetchFn={config => Api.albums.fetch({ config })}
        favoriteFn={uid => Api.albums.favorite({ uid })}
        model="albums"
      />
    </PageLayout>
  );
};

export default Albums;
