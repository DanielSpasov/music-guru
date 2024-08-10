import { Models, Serializer } from '../../Types';

export type QueryProps = { serializer?: Serializer };

export type ReqProps = {
  databaseName: 'models';
  collectionName: Models;
};

export type SimpleReqProps = {
  collectionName: Models;
};
