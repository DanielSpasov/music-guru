import { AggregationCursor, Collection } from 'mongodb';
import { Router } from 'express';

import { authorization, upload } from '../../Middleware';
import { fetch, get, post } from '../helpers/requests';
import patch from '../../Services/Artists/patch';
import favorite from '../../Services/Favorites';
import { aggregators } from '../../Aggregators';
import updateImage from '../../Services/Image';
import { connect } from '../../Database';
import { DBArtist, QueryProps } from '../../Types';
import { useFilters, useSorting } from '../../Utils';
import { artistAggregators } from '../../Aggregators/Artist';

const router = Router();

router.get('/', async (req, res, next) => {
  const mongo = await connect();
  try {
    const {
      serializer = 'list',
      limit = '25',
      sort = '-created_at',
      ...query
    } = req.query as QueryProps;

    console.log(useFilters(query));

    const items = mongo
      .db('models')
      .collection('artists')
      .aggregate(artistAggregators[serializer])
      .match({
        $and: [
          { name: { $regex: 'la', $options: 'i' } },
          {
            uid: {
              $regex: '96',
              $options: 'i'
            }
          }
        ]
      })
      .project({ _id: 0 })
      .sort(useSorting(sort))
      .limit(Number(limit));

    const data = await items.toArray();

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  } finally {
    await mongo.close();
  }
});

router.get('/:id', get({ collectionName: 'artists' }));

router.post(
  '/',
  [authorization, upload('image')],
  post({ collectionName: 'artists' })
);
router.post('/favorite', [authorization], favorite({ model: 'artists' }));
router.post(
  '/:id/image',
  [authorization, upload('image')],
  updateImage({ model: 'artists' })
);

router.patch('/:id', authorization, patch);

export default router;
