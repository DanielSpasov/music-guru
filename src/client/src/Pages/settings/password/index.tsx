import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { ChangePassData, ChangePassSchema } from '../../../Validations';
import { Form, Input, Link, PageLayout } from '../../../Components';
import { SubmitFn } from '../../../Components/Forms/Form/types';
import { AuthContext } from '../../../Contexts';
import { sidebarLinks } from '../links';
import Api from '../../../Api';

const Password = () => {
  const { dispatch, data } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit: SubmitFn<ChangePassData> = useCallback(
    async formData => {
      try {
        await Api.users.changePassword({ body: formData });
        toast.success('Password changed.');
        dispatch({ type: 'SIGNOUT' });
        navigate('/sign-in');
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message);
          return;
        }
        toast.error('Failed to submit form.');
      }
    },
    [navigate, dispatch]
  );

  return (
    <PageLayout
      title="Change Password"
      heading="Change Password"
      hideResourses
      hideRecent
      links={sidebarLinks}
    >
      <Form
        onSubmit={onSubmit}
        validationSchema={ChangePassSchema}
        className="m-auto"
        submitBtn={{ disabled: !data?.verified, label: 'Submit' }}
        additionalContent={
          !data?.verified && (
            <div className="text-center p-2">
              <span className="text-amber-500">
                You need to{' '}
                <Link
                  type="link"
                  to="/settings/mfa"
                  className="underline text-[16px] text-amber-500"
                >
                  verify your email
                </Link>{' '}
                before you can change your password.
              </span>
            </div>
          )
        }
      >
        <Input
          label="Current Password"
          name="current_password"
          type="password"
          required
        />
        <Input
          label="New Password"
          name="new_password"
          type="password"
          sideEffect={(e, { trigger, formState }) => {
            if (formState.isSubmitted) trigger('confirm_new_password');
          }}
          required
        />
        <Input
          label="Confirm New Password"
          name="confirm_new_password"
          type="password"
          required
        />
      </Form>
    </PageLayout>
  );
};

export default Password;
