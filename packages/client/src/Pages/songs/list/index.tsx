import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AxiosRequestConfig } from 'axios';

import { IPlus, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

const Songs = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchFn = useCallback(
    (config?: AxiosRequestConfig) =>
      Api.songs.fetch({
        config: { ...config, params: { limit: 25, ...config?.params } }
      }),
    []
  );

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
        sortingConfig={[
          { key: 'created_at', label: 'Date Added' },
          { key: 'favorites', label: 'Favorites' },
          { key: 'name', label: 'Name' }
        ]}
        model="songs"
        fetchFn={fetchFn}
        perPage={56}
      />
    </PageLayout>
  );
};

export default Songs;
