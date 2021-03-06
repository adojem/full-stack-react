import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import productCtrl from '../controllers/product.controller';
import orderCtrl from '../controllers/order.controller';
import shopCtrl from '../controllers/shop.controller';

const router = express.Router();

router
   .route('/api/orders/:userId')
   .post(
      authCtrl.requireSignin,
      userCtrl.stripeCustomer,
      productCtrl.decreaseQuantity,
      orderCtrl.create,
   );

router
   .route('/api/orders/shop/:shopId')
   .get(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.listByShop);

router.route('/api/order/status_values').get(orderCtrl.getStatusValues);

router
   .route('/api/order/:shopId/cancel/:productId')
   .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.increaseQuantity, orderCtrl.update);

router
   .route('/api/order/:orderId/charge/:userId/:shopId')
   .put(authCtrl.requireSignin, shopCtrl.isOwner, userCtrl.createCharge, orderCtrl.update);

router
   .route('/api/order/status/:shopId')
   .put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update);

router.param('userId', userCtrl.userByID);
router.param('shopId', shopCtrl.shopById);
router.param('productId', productCtrl.productById);
router.param('orderId', orderCtrl.orderById);

export default router;
