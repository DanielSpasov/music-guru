import { FC, memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { SideEffect } from '../../../../../../Components/Forms/Fields/Input/types';
import { SubmitFn } from '../../../../../../Components/Forms/Form/types';
import { Fieldset, Form, Input } from '../../../../../../Components';
import { UpdateDataProps } from './types';
import Api from '../../../../../../Api';
import {
  UpdateUserData,
  UpdateUserSchema
} from '../../../../../../Validations';

const UpdateData: FC<UpdateDataProps> = ({ data: user, dispatch }) => {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [warn, setWarn] = useState(false);

  const onSubmit: SubmitFn<UpdateUserData> = useCallback(
    async formData => {
      try {
        if (!user?.uid) return;
        const { data } = await Api.users.changeUsername({
          id: user?.uid,
          body: { username: formData.username }
        });
        dispatch({ type: 'UPDATE', payload: { data } });
        toast.success('Username updated.');
      } catch (err) {
        toast.error('Failed to update username.');
      }
    },
    [user, dispatch]
  );

  const usernameSideEffect: SideEffect = useCallback(
    e => {
      if (e.target.value === user?.username) {
        setDisableSubmit(true);
      } else {
        setDisableSubmit(false);
      }

      if (e.target.value === '') {
        setWarn(true);
      } else {
        setWarn(false);
      }
    },
    [user?.username]
  );

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={UpdateUserSchema}
      disableSubmit={disableSubmit}
      defaultValues={{ username: user?.username, email: user?.email }}
      submitLabel="Save Changes"
      className="w-full mt-4"
    >
      <Fieldset className="flex gap-2">
        <div className="w-full">
          <Input
            label="Username"
            name="username"
            sideEffect={usernameSideEffect}
          />
          {warn && (
            <span className="text-amber-500">
              Username will be set to the email&apos;s username.
            </span>
          )}
        </div>

        <Input label="Email" name="email" required disabled />
      </Fieldset>
    </Form>
  );
};

export default memo(UpdateData);
