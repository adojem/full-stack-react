import fs from 'fs';
import formidable from 'formidable';
import errorHandler from '../helpers/dbErrorHandler';
import Product from '../models/product.model';

const create = (req, res) => {
   const form = new formidable.IncomingForm();
   form.keepExtensions = true;
   form.parse(req, (err, fields, files) => {
      if (err) {
         return res.status(400).json({
            message: 'Image could not be uploaded',
         });
      }
      const product = new Product(fields);
      product.shop = req.shop;
      if (files.image) {
         product.image.data = fs.readFileSync(files.image.path);
         product.image.contentType = files.image.type;
      }
      return product.save((err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(result);
      });
   });
};

const listByShop = (req, res) => {
   Product.find({ shop: req.shop._id }, (err, products) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(products);
   })
      .populate('shop', '_id name')
      .select('-image');
};

export default { create, listByShop };
