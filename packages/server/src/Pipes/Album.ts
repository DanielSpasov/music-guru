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
            ...serializers.songs?.list,
            _id: 0,
            artist: 1
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
            artist: null
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
                { $eq: ['$discs.songs.artist', null] }
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
    $addFields: {
      discs: {
        $cond: {
          if: { $eq: ['$songs', []] }, // If there are no songs, return an empty array
          then: [],
          else: {
            $filter: {
              input: {
                $map: {
                  input: [{ $arrayElemAt: ['$discs', 0] }],
                  as: 'disc',
                  in: {
                    number: '$$disc.number',
                    songs: {
                      $filter: {
                        input: '$songs',
                        as: 'song',
                        cond: { $ne: ['$$song', null] }
                      }
                    }
                  }
                }
              },
              as: 'disc',
              cond: { $gt: [{ $size: '$$disc.songs' }, 0] }
            }
          }
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
          cond: { $gt: [{ $size: '$$disc.songs' }, 0] }
        }
      }
    }
  },
  {
    $addFields: {
      discs: {
        $cond: {
          if: { $eq: [{ $size: '$discs' }, 0] },
          then: [],
          else: '$discs'
        }
      }
    }
  }
];

export const albumPipelines: PipelineStage[] = [...artist, ...type, ...songs];
