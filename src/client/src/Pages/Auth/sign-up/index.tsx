import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input, Link, PageLayout } from '../../../Components';
import { SignUpData, SignUpSchema } from '../helpers';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import Api from '../../../Api';

export default function SignUp() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: SignUpData) => {
      try {
        const { uid, token } = await Api.user.signUp(data);
        dispatch({ type: 'SIGNUP', payload: { uid, token } });
        navigate('/');
      } catch (error: any) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [navigate, dispatch]
  );

  return (
    <PageLayout title="Sign Up" showHeader={false}>
      <div className="w-1/2 m-auto mt-5">
        <Form
          validationSchema={SignUpSchema as any}
          onSubmit={onSubmit}
          header="Sign Up"
          additionalInfo={
            <div className="text-center p-4">
              <span>Or</span>
              <Link
                to="/sign-in"
                fontSize="1em"
                textDecoration="underline"
                display="inline"
              >
                sign in
              </Link>
              <span>if you already have an account.</span>
            </div>
          }
          schema={[
            {
              key: 'fields',
              fields: [
                {
                  key: 'username',
                  label: 'Username',
                  Component: Input,
                  props: { type: 'text' }
                },
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
                },
                {
                  key: 'repeat_password',
                  label: 'Repeat Password',
                  Component: Input,
                  props: { type: 'password' },
                  validations: {
                    required: {
                      value: true,
                      message: 'Repeat Password is required.'
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
