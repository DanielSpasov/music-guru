import { Model, Serializer } from '../../Types';

export type QueryProps = { serializer?: Serializer };

export type ReqProps = {
  collectionName: Model;
};

export type SimpleReqProps = {
  collectionName: Model;
};
