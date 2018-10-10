import express from 'express';
import authCtrl from '../controllers/auth.controller';
import shopCtrl from '../controllers/shop.controller';
import productCtrl from '../controllers/product.controller';

const router = express.Router();

router
   .route('/api/products/by/:shopId')
   .get(productCtrl.listByShop)
   .post(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.create);

router.route('/api/products/latest').get(productCtrl.listLatest);

router.route('/api/products/related/:productId').get(productCtrl.listRelated);

router.param('shopId', shopCtrl.shopById);
router.param('productId', productCtrl.productById);

export default router;
