import formidable from 'formidable';
import fs from 'fs';
import Post from '../models/post.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = (req, res) => {
   const form = new formidable.IncomingForm();
   form.keepExtensions = true;
   form.parse(req, (err, fields, files) => {
      if (err) {
         return res.status(400).json({
            error: 'Image could not be uploaded',
         });
      }
      const post = new Post(fields);
      post.postedBy = req.profile;
      if (files.photo) {
         post.photo.data = fs.readFileSync(files.photo.path);
         post.photo.contentType = files.photo.type;
      }
      post.save((err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(result);
      });
   });
};

const listNewsFeed = (req, res) => {
   const { following } = req.profile;
   following.push(req.profile._id);
   Post.find({ postedBy: { $in: req.profile.following } })
      .populate('comments', 'text created')
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec((err, posts) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(posts);
      });
};

const listByUser = (req, res) => {
   Post.find({ postedBy: req.profile._id })
      .populate('comments', 'text created')
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec((err, posts) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(posts);
      });
};

export default { create, listByUser, listNewsFeed };
