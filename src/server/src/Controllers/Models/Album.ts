import { Request, Response, Router } from 'express';
import multer from 'multer';

import { fetch, post, get, del, patch } from '../helpers/requests';
import { authorization } from '../../Middleware';
import { errorHandler } from '../../Error';
import { connect } from '../../Database';
import { QueryProps } from '../helpers/helpers';

const upload = <any>multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', fetch('albums'));
router.get('/types', async (req: Request, res: Response) => {
  try {
    const params: QueryProps = req.query;
    const filters = Object.entries(params).map(([name, value]) => {
      return { $match: { [name]: { $regex: value, $options: 'i' } } };
    });
    const db = await connect();
    const collection = db.collection('album-types');
    const items = collection.aggregate([...filters, { $project: { _id: 0 } }]);
    const data = await items.toArray();
    res.status(200).json({ data });
  } catch (err) {
    errorHandler(req, res, err);
  }
});

router.get('/:id', get('albums'));

router.delete('/:id', authorization, del('albums'));

router.post('/', [authorization, upload.any('image')], post('albums'));

router.patch('/:id', authorization, patch('albums'));

export default router;
