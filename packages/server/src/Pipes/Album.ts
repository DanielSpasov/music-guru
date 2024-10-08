import { PipelineStage } from 'mongoose';

import { serializers } from '../Serializers';

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
  { $unwind: { path: '$discs', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$discs.songs', preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: 'songs',
      localField: 'discs.songs.uid',
      foreignField: 'uid',
      as: 'data',
      pipeline: [
        {
          $project: {
            ...serializers.songs?.album,
            _id: 0,
            artist: 1,
            features: 1
          }
        }
      ]
    }
  },
  {
    $addFields: {
      'discs.songs': {
        $cond: {
          if: { $gt: [{ $size: '$data' }, 0] },
          then: {
            $mergeObjects: [
              { number: '$discs.songs.number', uid: '$discs.songs.uid' },
              { $arrayElemAt: ['$data', 0] }
            ]
          },
          else: {
            number: '$discs.songs.number',
            uid: '$discs.songs.uid',
            name: null,
            image: null,
            artist: null,
            features: null
          }
        }
      }
    }
  },
  {
    $lookup: {
      from: 'artists',
      localField: 'discs.songs.artist',
      foreignField: 'uid',
      as: 'artistDetails',
      pipeline: [
        {
          $project: {
            ...serializers.artists?.list,
            _id: 0
          }
        }
      ]
    }
  },
  {
    $addFields: {
      'discs.songs.artist': {
        $arrayElemAt: ['$artistDetails', 0] // Extract artist details
      }
    }
  },
  {
    $lookup: {
      from: 'artists',
      localField: 'discs.songs.features',
      foreignField: 'uid',
      as: 'featuresDetails',
      pipeline: [
        {
          $project: {
            ...serializers.artists?.list,
            _id: 0
          }
        }
      ]
    }
  },
  {
    $addFields: {
      'discs.songs.features': {
        $ifNull: ['$featuresDetails', []]
      }
    }
  },
  {
    $group: {
      _id: { albumId: '$_id', discNumber: '$discs.number' },
      uid: { $first: '$uid' },
      name: { $first: '$name' },
      about: { $first: '$about' },
      links: { $first: '$links' },
      image: { $first: '$image' },
      artist: { $first: '$artist' },
      release_date: { $first: '$release_date' },
      created_at: { $first: '$created_at' },
      created_by: { $first: '$created_by' },
      editors: { $first: '$editors' },
      type: { $first: '$type' },
      favorites: { $first: '$favorites' },
      discNumber: { $first: '$discs.number' },
      songs: {
        $push: {
          $cond: [
            {
              $or: [
                { $eq: ['$discs.songs.name', null] },
                { $eq: ['$discs.songs.image', null] },
                { $eq: ['$discs.songs.artist', null] },
                { $eq: ['$discs.songs.features', null] }
              ]
            },
            null,
            '$discs.songs'
          ]
        }
      }
    }
  },
  {
    $group: {
      _id: '$_id.albumId',
      uid: { $first: '$uid' },
      name: { $first: '$name' },
      about: { $first: '$about' },
      links: { $first: '$links' },
      image: { $first: '$image' },
      artist: { $first: '$artist' },
      release_date: { $first: '$release_date' },
      created_at: { $first: '$created_at' },
      created_by: { $first: '$created_by' },
      editors: { $first: '$editors' },
      type: { $first: '$type' },
      favorites: { $first: '$favorites' },
      discs: {
        $push: {
          number: '$discNumber',
          songs: {
            $filter: {
              input: '$songs',
              as: 'song',
              cond: { $ne: ['$$song', null] }
            }
          }
        }
      }
    }
  },
  {
    $addFields: {
      discs: {
        $filter: {
          input: '$discs',
          as: 'disc',
          cond: {
            $and: [
              { $ne: ['$$disc.number', null] },
              {
                $or: [
                  { $gt: [{ $size: '$$disc.songs' }, 0] },
                  { $eq: [{ $size: '$$disc.songs' }, 0] }
                ]
              }
            ]
          }
        }
      }
    }
  }
];

export const albumPipelines: PipelineStage[] = [...artist, ...type, ...songs];
