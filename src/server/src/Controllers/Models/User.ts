import { Router } from 'express';

import { SignUp, SignIn, ValidateToken } from '../../Services/Auth';
import { UserModel, IUser } from '../../Database/Schemas';
import { get } from '../../Services/requests';

const router = Router();

router.get('/validate-jwt', ValidateToken);

router.get('/:id', get<IUser>({ Model: UserModel }));

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);

export default router;
