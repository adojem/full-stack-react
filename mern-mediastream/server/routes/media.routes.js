import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import mediaCtrl from '../controllers/media.controller';

const router = express.Router();

router.route('/api/media/new/:userId').post(authCtrl.requireSign, mediaCtrl.create);

router.param('userId', userCtrl.userByID);

export default router;
