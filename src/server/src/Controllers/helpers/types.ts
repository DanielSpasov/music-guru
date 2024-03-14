import { Models, Serializer, Types } from '../../Database/Types';

export type QueryProps = { serializer?: Serializer };

export type ReqProps =
  | {
      databaseName: 'models';
      collectionName: Models;
    }
  | {
      databaseName: 'types';
      collectionName: Types;
    };

export type SimpleReqProps = {
  collectionName: Models;
};
