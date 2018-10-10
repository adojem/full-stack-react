import fs from 'fs';
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
   photo,
   defaultPhoto,
   listByShop,
   listLatest,
   listRelated,
   productById,
   read,
};
