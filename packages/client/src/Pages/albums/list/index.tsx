import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AxiosRequestConfig } from 'axios';

import { IPlus, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import Api from '../../../Api';

const Albums = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchFn = useCallback(
    (config?: AxiosRequestConfig) => Api.albums.fetch({ config }),
    []
  );

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
        fetchFn={fetchFn}
        model="albums"
      />
    </PageLayout>
  );
};

export default Albums;
