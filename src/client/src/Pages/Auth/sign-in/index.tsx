import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, PageLayout, Link, Input } from '../../../Components';
import { SignInData, SignInSchema } from '../helpers';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import Api from '../../../Api';

export default function SignIn() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: SignInData) => {
      try {
        const { uid, token } = await Api.user.signIn(data);
        dispatch({ type: 'SIGNIN', payload: { uid, token } });
        navigate('/');
      } catch (error: any) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [navigate, dispatch]
  );

  return (
    <PageLayout title="Sign In" showHeader={false}>
      <div className="w-1/2 m-auto mt-5">
        <Form
          validationSchema={SignInSchema}
          onSubmit={onSubmit}
          header="Sign In"
          additionalInfo={
            <div className="text-center p-4">
              <span>Or</span>
              <Link to="/sign-up" className="underline p-1">
                sign up
              </Link>
              <span>if you don&apos;t have an account yet.</span>
            </div>
          }
          schema={[
            {
              key: 'fields',
              fields: [
                {
                  key: 'email',
                  label: 'Email',
                  Component: Input,
                  props: { type: 'email' },
                  validations: {
                    required: {
                      value: true,
                      message: 'Email is required.'
                    }
                  }
                },
                {
                  key: 'password',
                  label: 'Password',
                  Component: Input,
                  props: { type: 'password' },
                  validations: {
                    required: {
                      value: true,
                      message: 'Password is required.'
                    }
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </PageLayout>
  );
}
