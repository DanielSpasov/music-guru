import { PipelineStage } from 'mongoose';

const artist: PipelineStage[] = [
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

const verses: PipelineStage[] = [
  {
    $unwind: {
      path: '$verses',
      preserveNullAndEmptyArrays: true
    }
  }
];

const socials: PipelineStage[] = [
  {
    $unwind: {
      path: '$links',
      preserveNullAndEmptyArrays: true
    }
  }
];

const features: PipelineStage[] = [
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
      verses: { $addToSet: '$verses' },
      links: { $addToSet: '$links' },
      about: { $first: '$about' },
      editors: { $first: '$editors' },
      favorites: { $first: '$favorites' }
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

export const aggregators: PipelineStage[] = [
  ...artist,
  ...verses,
  ...socials,
  ...features
];
