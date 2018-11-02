import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import gameCtrl from '../controllers/game.controller';

const router = express.Router();

router.route('/api/games').get(gameCtrl.list);

router
   .route('/api/games/by/:userId')
   .post(authCtrl.requireSignin, authCtrl.hasAuthorization, gameCtrl.create);

router.param('userId', userCtrl.userById);

export default router;
