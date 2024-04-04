import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

export default function Albums() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Albums"
      showHeader={false}
      actions={[
        {
          icon: 'add',
          onClick: () => navigate('create'),
          hidden: !isAuthenticated
        }
      ]}
    >
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
        model="albums"
        center={false}
      />
    </PageLayout>
  );
}
