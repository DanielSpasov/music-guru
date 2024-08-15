import { useCallback, useContext, useState } from 'react';

import { IEmail, IGoogle, IPhone, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts';
import { sidebarLinks } from '../links';

// Composables
import TableRow from './composables/TableRow';
import { toast } from 'react-toastify';
import Api from '../../../Api';

const MFA = () => {
  const { data } = useContext(AuthContext);

  const [loadingEmail, setLoadingEmail] = useState(false);

  const sendVerificationEmail = useCallback(async () => {
    try {
      setLoadingEmail(true);
      await Api.users.reSendValidationEmail();
      toast.success('Verification email sent.');
    } catch (err) {
      toast.error('Failed to send verification email.');
    } finally {
      setLoadingEmail(false);
    }
  }, []);

  return (
    <PageLayout
      title="MFA"
      heading="Multi Factor Authentication"
      hideFooter
      links={sidebarLinks}
    >
      <table className="w-full">
        <thead className="border-b-neutral-700 border-b-[1px]">
          <tr>
            <th className="text-start p-2" />
            <th className="text-start p-2">Verification Method</th>
            <th className="text-start p-2">Status</th>
            <th className="text-start p-2" />
          </tr>
        </thead>

        <tbody>
          <TableRow
            Icon={IEmail}
            label="Email"
            value={Boolean(data?.verified)}
            action={{
              label: 'Verify',
              onClick: sendVerificationEmail,
              disabled: data?.verified,
              loading: loadingEmail
            }}
          />
          <TableRow Icon={IGoogle} label="Google Authenticator" value={false} />
          <TableRow Icon={IPhone} label="Phone Number" value={false} />
        </tbody>
      </table>
    </PageLayout>
  );
};

export default MFA;
