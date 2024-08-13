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

const type: PipelineStage[] = [
  {
    $lookup: {
      from: 'album_types',
      localField: 'type',
      foreignField: 'uid',
      as: 'type'
    }
  },
  {
    $unwind: '$type'
  }
];

const songs: PipelineStage[] = [
  {
    $lookup: {
      from: 'songs',
      localField: 'songs',
      foreignField: 'uid',
      as: 'songs'
    }
  },
  {
    $unwind: {
      path: '$songs',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'artists',
      localField: 'songs.artist',
      foreignField: 'uid',
      as: 'songs.artist'
    }
  },
  {
    $addFields: {
      'songs.artist': {
        $arrayElemAt: ['$songs.artist', 0]
      }
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
      type: { $first: '$type' },
      songs: { $push: '$songs' },
      favorites: { $first: '$favorites' }
    }
  },
  {
    $addFields: {
      songs: {
        $filter: {
          input: '$songs',
          as: 'song',
          cond: { $ne: ['$$song', {}] }
        }
      }
    }
  }
];

export const aggregators: PipelineStage[] = [...artist, ...type, ...songs];
