import {
  DelProps,
  FetchProps,
  GetProps,
  PatchProps,
  PostProps,
  PutProps
} from './types';

export const getValues: GetProps = { id: '', config: {} };
export const fetchValues: FetchProps = { config: {} };
export const postValues: PostProps = { config: {}, body: {} };
export const patchValues: PatchProps = { id: '', body: {}, config: {} };
export const delValues: DelProps = { id: '', config: {} };
export const putValues: PutProps = { id: '', body: {}, config: {} };
