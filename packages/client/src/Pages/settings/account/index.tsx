import { useContext } from 'react';

import { PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import { sidebarLinks } from '../links';

// Composables
import GeneralInfo from './composables/GeneralInfo';
import UpdateData from './composables/UpdateData';

const Account = () => {
  const { data, dispatch } = useContext(AuthContext);

  return (
    <PageLayout
      title="Accont Settings"
      heading="Account Settings"
      hideRecent
      hideFooter
      links={sidebarLinks}
    >
      <GeneralInfo data={data} />
      <UpdateData data={data} dispatch={dispatch} />
    </PageLayout>
  );
};

export default Account;
