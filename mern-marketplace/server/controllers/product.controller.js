import fs from 'fs';
import _ from 'lodash';
import formidable from 'formidable';
import errorHandler from '../helpers/dbErrorHandler';
import Product from '../models/product.model';
import profileImage from '../../client/assets/images/profile-pic.png';

const read = (req, res) => {
   req.product.image = undefined;
   return res.json(req.product);
};

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

const update = (req, res, next) => {
   const form = new formidable.IncomingForm();
   form.keepExtensions = true;
   form.parse(req, (err, fields, files) => {
      if (err) {
         return res.status(400).json({
            message: 'Photo could not be uploaded',
         });
      }
      let { product } = req;
      product = _.extend(product, fields);
      product.updated = Date.now();
      if (files.image) {
         product.image.data = fs.readFileSync(files.image.path);
         product.image.contentType = files.image.type;
      }
      product.save((err, result) => {
         if (err) {
            return res.status(400).send({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(result);
      });
   });
};

const remove = (req, res) => {
   const { product } = req;
   product.remove((err, deletedProduct) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(deletedProduct);
   });
};

const list = (req, res) => {
   const query = {};
   if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
   }
   if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
   }
   Product.find(query, (err, products) => {
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

const listLatest = (req, res) => {
   Product.find({})
      .sort('-created')
      .limit(5)
      .populate('shop', '_id name')
      .exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(products);
      });
};

const listRelated = (req, res) => {
   Product.find({ _id: { $ne: req.product }, category: req.product.category })
      .limit(5)
      .populate('shop', '_id name')
      .exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(products);
      });
};

const listCategories = (req, res) => {
   Product.distinct('category', {}, (err, products) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(products);
   });
};

const decreaseQuantity = (req, res, next) => {
   const bulkOps = req.body.order.products.map(item => ({
      updateOne: {
         filter: {
            _id: item.product._id,
         },
         update: {
            $inc: {
               quantity: -item.quantity,
            },
         },
      },
   }));

   Product.bulkWrite(bulkOps, {}, (err, products) => {
      if (err) {
         return res.status(400).json({
            error: 'Could not update product',
         });
      }
      return next();
   });
};

const increaseQuantity = (req, res, next) => {
   Product.findByIdAndUpdate(
      req.product._id,
      { $inc: { quantity: req.body.quantity } },
      { new: true },
   ).exec((err, result) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return next();
   });
};

const productById = (req, res, next, id) => {
   Product.findById(id)
      .populate('shop', '_id name')
      .exec((err, product) => {
         if (err || !product) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         req.product = product;
         return next();
      });
};

const photo = (req, res, next) => {
   if (req.product.image.data) {
      res.set('Content-Type', req.product.image.contentType);
      return res.send(req.product.image.data);
   }
   return next();
};

const defaultPhoto = (req, res) => res.sendFile(process.cwd() + profileImage);

export default {
   create,
   decreaseQuantity,
   photo,
   defaultPhoto,
   increaseQuantity,
   list,
   listByShop,
   listLatest,
   listRelated,
   listCategories,
   productById,
   read,
   remove,
   update,
};
