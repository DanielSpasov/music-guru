import { NextFunction, Request, Response } from 'express';

import { useFilters, useSorting } from '../../../Utils';
import { serializers } from '../../../Serializers';
import { QueryProps, Album } from '../../../Types';
import { pipelines } from '../../../Pipes';
import Song from '../../../Schemas/Song';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      serializer = 'list',
      limit = '25',
      sort = 'created_at',
      page = '1',
      ...query
    } = req.query as QueryProps;

    const filters = useFilters(query);
    const sorting = useSorting(sort);

    const album = res.locals.item as Album;
    const songsInAlbum = album.discs
      .map(disc => [...disc.songs.map(x => x.uid)])
      .flat();

    const hardMatch = {
      $and: [
        { 'artist.uid': { $regex: album.artist, $options: 'i' } },
        { uid: { $nin: songsInAlbum } }
      ]
    };

    const [total, data] = await Promise.all([
      Song.aggregate(pipelines.songs)
        .match(hardMatch)
        .match(filters)
        .count('totalDocuments'),
      Song.aggregate(pipelines.songs)
        .match(hardMatch)
        .match(filters)
        .sort(sorting)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .project({ ...serializers.songs?.[serializer], _id: 0 })
    ]);

    const totalItems = total?.[0]?.totalDocuments ?? 0;

    res.status(200).json({
      data,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / Number(limit)),
        currentPage: Number(page)
      }
    });
  } catch (err) {
    next(err);
  }
};
