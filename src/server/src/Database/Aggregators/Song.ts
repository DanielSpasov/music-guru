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

const artist: AggregationStage[] = [
  {
    $lookup: {
      from: 'artists',
      localField: 'artist',
      foreignField: 'uid',
      as: 'artist'
    }
  },
  {
    $unwind: '$artist'
  }
];

const verses: AggregationStage[] = [
  {
    $unwind: {
      path: '$verses',
      preserveNullAndEmptyArrays: true
    }
  }
];

const features: AggregationStage[] = [
  {
    $lookup: {
      from: 'artists',
      localField: 'features',
      foreignField: 'uid',
      as: 'features'
    }
  },
  {
    $unwind: {
      path: '$features',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group: {
      _id: '$_id',
      uid: { $first: '$uid' },
      name: { $first: '$name' },
      image: { $first: '$image' },
      artist: { $first: '$artist' },
      release_date: { $first: '$release_date' },
      created_at: { $first: '$created_at' },
      created_by: { $first: '$created_by' },
      features: { $addToSet: '$features' },
      verses: { $addToSet: '$verses' }
    }
  },
  {
    $addFields: {
      features: {
        $filter: {
          input: '$features',
          as: 'artist',
          cond: { $ne: ['$$artist', {}] }
        }
      }
    }
  }
];

export const songAggregators: AggregationStage[] = [
  ...created_by,
  ...artist,
  ...verses,
  ...features
];
