import { Order, CartItem } from '../models/order.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = (req, res) => {
   req.body.order.user = req.profile;
   const order = new Order(req.body.order);
   order.save((err, result) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.status(200).json(result);
   });
};

const listByShop = (req, res) => {
   Order.find({ 'products.shop': req.shop._id })
      .populate({ path: 'products.product', select: '_id name price' })
      .sort('-created')
      .exec((err, orders) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(orders);
      });
};

const update = (req, res) => {
   Order.updateOne(
      {
         'products._id': req.body.cartItemId,
      },
      {
         $set: {
            'products.$.status': req.body.status,
         },
      },
      (err, order) => {
         if (err) {
            return res.status(400).send({
               error: errorHandler.getErrorMessage(err),
            });
         }

         return res.json(order);
      },
   );
};

const getStatusValues = (req, res) => res.json(CartItem.schema.path('status').enumValues);

const orderById = (req, res, next, id) => {
   Order.findById(id)
      .populate('products.product', 'name price')
      .exec((err, order) => {
         if (err || !order) {
            return res.status(400).json({
               error: 'Order not found',
            });
         }
         req.order = order;
         return next();
      });
};

export default {
   create,
   getStatusValues,
   listByShop,
   orderById,
   update,
};
