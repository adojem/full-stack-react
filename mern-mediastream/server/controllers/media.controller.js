import formidable from 'formidable';
import fs from 'fs';

import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import errorHandler from '../helpers/dbErrorHandler';
import Media from '../models/mdedia.model';

Grid.mongo = mongoose.mongo;
let gridfs = null;
mongoose.connection.on('connected', () => {
   gridfs = Grid(mongoose.connection.db);
});

const create = (req, res, next) => {
   const form = new formidable.IncomingForm();
   form.keepExtensions = true;
   form.parse(req, (err, fields, files) => {
      if (err) {
         return res.status(400).json({
            error: 'Video could not be uploaded',
         });
      }
      const media = new Media(fields);
      media.postedBy = req.profile;
      if (files.video) {
         const writestream = gridfs.createWriteStream({ _id: media._id });
         fs.createReadStream(files.video.path).pipe(writestream);
      }
      media.save((err, result) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(result);
      });
   });
};

const video = (req, res) => {
   gridfs.findOne(
      {
         _id: req.media._id,
      },
      (err, file) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         if (!file) {
            return res.status(404).json({
               error: 'No video found',
            });
         }

         if (req.headers.range) {
            const parts = req.headers.range.replace(/bytes=/, '').split('-');
            const partiallstart = parts[0];
            const partialend = parts[1];

            const start = parseInt(partiallstart, 10);
            const end = partialend ? parseInt(partialend, 10) : file.length - 1;
            const chunksize = end - start + 1;

            res.writeHead(206, {
               'Accept-Ranges': 'bytes',
               'Content-Lnegth': chunksize,
               'Content-Range': `bytes ${start}-${end}/${file.length}`,
               'Content-Type': file.contentType,
            });

            return gridfs
               .createReadStream({
                  _id: file._id,
                  range: {
                     startPos: start,
                     endPos: end,
                  },
               })
               .pipe(res);
         }

         res.header('Content-Lenth', file.length);
         res.header('Content-Type', file.contentType);

         return gridfs
            .createReadStream({
               _id: file._id,
            })
            .pipe(res);
      },
   );
};

const listPopular = (req, res) => {
   Media.find({})
      .limit(10)
      .populate('postedBy', '_id name')
      .sort('-views')
      .exec((err, posts) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(posts);
      });
};

const mediaById = (req, res, next, id) => {
   Media.findById(id)
      .populate('postedBy', '_id name')
      .exec((err, media) => {
         if (err || !media) {
            return res.status(400).json({
               error: 'Media not found',
            });
         }
         req.media = media;
         return next();
      });
};

export default {
   create, listPopular, mediaById, video,
};
