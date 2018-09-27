import _ from 'lodash';
import formidable from 'formidable';
import fs from 'fs';
import errorHandler from '../helpers/dbErrorHandler';
import User from '../models/user.model';
import profileImage from '../../client/assets/images/profile-pic.png';

const create = (req, res, next) => {
   const user = new User(req.body);
   user.save((err, result) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.status(200).json({
         message: 'Successfully signed up!',
      });
   });
};

const list = (req, res) => {
   User.find((err, users) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(users);
   }).select('name email updated created');
};

const userByID = (req, res, next, id) => {
   User.findById(id)
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec((err, user) => {
         if (err || !user) {
            return res.status('400').json({
               error: 'User not found',
            });
         }
         req.profile = user;
         return next();
      });
};

const read = (req, res) => {
   req.profile.hashed_password = undefined;
   req.profile.salt = undefined;
   return res.json(req.profile);
};

const update = (req, res, next) => {
   const form = new formidable.IncomingForm();
   form.keepExtensions = true;
   form.parse(req, (err, fields, files) => {
      if (err) {
         return res.status(400).json({
            error: 'Photo could not be uploaded',
         });
      }
      let user = req.profile;
      user = _.extend(user, fields);
      user.updated = Date.now();
      if (files.photo) {
         user.photo.data = fs.readFileSync(files.photo.path);
         user.photo.contentType = files.photo.type;
      }
      user.save((err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         user.hashed_password = undefined;
         user.salt = undefined;
         return res.json(user);
      });
   });
};

const remove = (req, res, next) => {
   const user = req.profile;
   user.remove((err, deleteUser) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      deleteUser.hashed_password = undefined;
      deleteUser.salt = undefined;
      res.json(deleteUser);
   });
};

const photo = (req, res, next) => {
   if (req.profile.photo.data) {
      res.set('Content-Type', req.profile.photo.contentType);
      return res.send(req.profile.photo.data);
   }
   next();
};

const defaultPhoto = (req, res) => res.sendFile(process.cwd() + profileImage);

const addFollowing = (req, res, next) => {
   User.findByIdAndUpdate(
      req.body.userId,
      { $push: { following: req.body.followId } },
      (err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         next();
      },
   );
};

const addFollower = (req, res) => {
   console.log(req.body);
   User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true },
   )
      .populate('following', '_id name')
      .populate('folowers', '_id name')
      .exec((err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         result.hashed_password = undefined;
         result.salt = undefined;
         return res.json(result);
      });
};

const removeFollowing = (req, res, next) => {
   User.findByIdAndUpdate(
      req.body.userId,
      { $pull: { following: req.body.unfollowId } },
      (err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return next();
      },
   );
};

const removeFollower = (req, res) => {
   User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.body.userId } },
      { new: true },
   )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec((err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         result.hashed_password = undefined;
         result.salt = undefined;
         return res.json(result);
      });
};

const findPeople = (req, res) => {
   const { following } = req.profile;
   following.push(req.profile._id);
   User.find({ _id: { $nin: following } }, (err, users) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(users);
   }).select('name');
};

export default {
   create,
   userByID,
   read,
   list,
   remove,
   update,
   photo,
   defaultPhoto,
   addFollowing,
   addFollower,
   removeFollowing,
   removeFollower,
   findPeople,
};
