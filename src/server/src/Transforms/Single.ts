import { Single } from '../Validations/Single';

export default function transformSingle({ _doc: single }: any): Single {
  delete single.__v;
  delete single._id;
  return single;
}
