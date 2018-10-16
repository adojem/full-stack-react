import { Order } from '../models/order.model';
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

export default {
   create,
};
