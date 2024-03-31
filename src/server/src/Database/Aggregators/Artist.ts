import { AggregationStage } from './types';

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

export const artistAggregators: AggregationStage[] = [...created_by];
