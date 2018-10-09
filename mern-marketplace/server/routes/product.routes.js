import express from 'express';
import authCtrl from '../controllers/auth.controller';
import shopCtrl from '../controllers/shop.controller';

const router = express.Router();

router
   .route('/api/products/by/:shopId')
   .get(shopCtrl.listByOwner)
   .post(authCtrl.requireSignin, shopCtrl.isOwner);

export default router;
