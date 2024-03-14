import { Request, Response, Router } from 'express';
import multer from 'multer';

import { fetch, post, get, del, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';
import { QueryProps } from '../helpers/types';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';

const upload = <any>multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', fetch({ databaseName: 'models', collectionName: 'albums' }));
router.get('/types', async (req: Request, res: Response) => {
  try {
    const params: QueryProps = req.query;
    const filters = Object.entries(params).map(([name, value]) => ({
      $match: { [name]: { $regex: value, $options: 'i' } }
    }));
    const db = await connect('types');
    const collection = db.collection('albums');
    const items = collection.aggregate([...filters, { $project: { _id: 0 } }]);
    const data = await items.toArray();
    res.status(200).json({ data });
  } catch (err) {
    errorHandler(req, res, err);
  }
});

router.get('/:id', get({ databaseName: 'models', collectionName: 'albums' }));

router.delete('/:id', authorization, del({ collectionName: 'albums' }));

router.post(
  '/',
  [authorization, upload.any('image')],
  post({ collectionName: 'albums' })
);

router.patch('/:id', authorization, patch({ collectionName: 'albums' }));

export default router;
