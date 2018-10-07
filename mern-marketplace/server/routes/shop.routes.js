import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import shopController from '../controllers/shop.controller';

const router = express.Router();

router
   .route('/api/shops/by/:userId')
   .post(
      authCtrl.requireSignin,
      authCtrl.hasAuthorization,
      userCtrl.isSeller,
      shopController.create,
   );

router.param('userId', userCtrl.userByID);

export default router;
