import { PageLayout } from '../../../../Components';
import { sidebarLinks } from '../links';

const Password = () => {
  return (
    <PageLayout
      title="Change Password"
      heading="Change Password"
      hideResourses
      links={sidebarLinks}
    >
      Change Password
    </PageLayout>
  );
};

export default Password;
