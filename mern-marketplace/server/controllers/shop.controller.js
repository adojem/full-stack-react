import fs from 'fs';
import formidable from 'formidable';
import errorHandler from '../helpers/dbErrorHandler';
import Shop from '../models/shop.model';
import profileImage from '../../client/assets/images/profile-pic.png';

const create = (req, res, next) => {
   const form = new formidable.IncomingForm();
   form.keepExtensions = true;
   form.parse(req, (err, fields, files) => {
      if (err) {
         res.status(400).json({
            message: 'Image could not be uploaded',
         });
      }
      const shop = new Shop(fields);
      shop.owner = req.profile;
      if (files.image) {
         shop.image.data = fs.readFileSync(files.image.path);
         shop.image.contentType = files.image.type;
      }
      shop.save((err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.status(200).json(result);
      });
   });
};

const list = (req, res) => {
   Shop.find((err, shops) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(shops);
   });
};

const listByOwner = (req, res) => {
   Shop.find({ owner: req.profile._id }, (err, shops) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(shops);
   }).populate('owner', '_id name');
};

const read = (req, res) => res.json(req.shop);

const shopById = (req, res, next, id) => {
   Shop.findById(id)
      .populate('owner', '_id name')
      .exec((err, shop) => {
         if (err || !shop) {
            return res.status(400).json({
               error: 'Shop not found',
            });
         }
         req.shop = shop;
         return next();
      });
};

const photo = (req, res, next) => {
   const { image } = req.shop;
   if (image.data) {
      res.set('Content-Type', image.contentType);
      return res.send(image.data);
   }
   return next();
};

const defaultPhoto = (req, res) => res.sendFile(process.cwd() + profileImage);

export default {
   create,
   defaultPhoto,
   list,
   listByOwner,
   photo,
   read,
   shopById,
};
