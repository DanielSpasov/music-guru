const created_by = [
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

const artist = [
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

const songs = [
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
      songs: { $push: '$songs' }
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

export const albumAggregators = [...created_by, ...artist, ...songs];
