import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import shopController from '../controllers/shop.controller';

const router = express.Router();

router
   .route('/api/shops/by/:userId')
   .post(authCtrl.requireSignin, authCtrl.requireSignin, userCtrl.isSeller, shopController.create);
