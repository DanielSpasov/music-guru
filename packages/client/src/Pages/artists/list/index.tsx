import { useNavigate } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AxiosRequestConfig } from 'axios';

import { IPlus, List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import Api from '../../../Api';

const Artists = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchFn = useCallback(
    (config?: AxiosRequestConfig) => Api.artists.fetch({ config }),
    []
  );

  return (
    <PageLayout
      title="Artists"
      heading="Artists"
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
        fetchFn={fetchFn}
        model="artists"
      />
    </PageLayout>
  );
};

export default Artists;
