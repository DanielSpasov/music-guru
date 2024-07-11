import { FC, memo } from 'react';
import moment from 'moment';

import { GeneralInfoProps } from './types';
import { IUser } from '../../../../../../Components';

const GeneralInfo: FC<GeneralInfoProps> = ({ data }) => {
  return (
    <section>
      <h2>General Info</h2>
      <p className="text-neutral-400">
        Change your profile and account settings
      </p>

      <article className="flex items-center">
        <div>
          <IUser
            className="w-16 h-16 p-4 rounded-full"
            color="bg-neutral-300 [&>path]:fill-black"
          />
        </div>

        <div className="w-1/2 p-4">
          <p className="font-semibold">UID:</p>
          <span>{data?.uid}</span>
        </div>

        <div className="w-1/2 p-4">
          <p className="font-semibold">User Since:</p>
          <span>{moment(data?.created_at).format('LLLL')}</span>
        </div>
      </article>
    </section>
  );
};

export default memo(GeneralInfo);
