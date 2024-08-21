import { PipelineStage } from 'mongoose';

const group: PipelineStage[] = [
  {
    $group: {
      _id: '$_id',
      uid: { $first: '$uid' },
      name: { $first: '$name' },
      about: { $first: '$about' },
      image: { $first: '$image' },
      created_at: { $first: '$created_at' },
      created_by: { $first: '$created_by' },
      favorites: { $first: '$favorites' },
      editors: { $first: '$editors' },
      links: { $first: '$links' }
    }
  }
];

export const artistPipelines: PipelineStage[] = [...group];
