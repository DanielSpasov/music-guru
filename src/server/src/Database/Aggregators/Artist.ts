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

export const artistAggregators = [...created_by];
