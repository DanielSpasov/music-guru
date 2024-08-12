import { Serializer } from '../Types';
import { AggregationStage, GroupStage, ProjectStage } from './types';

const created_by: AggregationStage[] = [
  {
    $lookup: {
      from: 'users',
      localField: 'created_by',
      foreignField: 'uid',
      as: 'created_by'
    }
  },
  {
    $unwind: '$created_by'
  }
];

const list: AggregationStage[] = [
  {
    $group: {
      _id: '$_id',
      uid: { $first: '$uid' },
      name: { $first: '$name' },
      image: { $first: '$image' },
      favorites: { $first: '$favorites' }
    }
  }
];

const detailed: AggregationStage[] = [
  ...created_by,
  {
    $group: {
      _id: '$_id',
      uid: { $first: '$uid' },
      name: { $first: '$name' },
      about: { $first: '$about' },
      image: { $first: '$image' },
      created_at: { $first: '$created_at' },
      created_by: { $first: '$created_by.uid' },
      favorites: { $first: '$favorites' },
      links: { $first: '$links' }
      // 'test.123': { $first: '$created_by.username' },
      // 'test.1234': { $first: '$created_by.email' }
    }
  }
];

type Aggregator = Record<Serializer, AggregationStage[]>;
export const artistAggregators: Aggregator = { list, detailed };
