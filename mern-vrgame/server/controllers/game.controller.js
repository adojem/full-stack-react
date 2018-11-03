import _ from 'lodash';
import Game from '../models/game.model';
import errorHandler from '../helpers/dbErrorHandler';

const read = (req, res) => res.json(req.game);

const list = (req, res) => {
   Game.find({})
      .populate('maker', '_id name')
      .sort('-created')
      .exec((err, games) => {
         if (err) {
            return res.status(400).json({
               error: errorHandler.getErrorMessage(err),
            });
         }
         return res.json(games);
      });
};

const listByMaker = (req, res) => {
   Game.find({ maker: req.profile._id }, (err, games) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(games);
   }).populate('maker', '_id name');
};

const create = (req, res) => {
   const game = new Game(req.body);
   game.maker = req.profile;
   game.save((err, result) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.status(200).json(result);
   });
};

const update = (req, res) => {
   let { game } = req;
   game = _.extend(game, req.body);
   game.updated = Date.now();
   game.save((err) => {
      if (err) {
         return res.status(400).send({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(game);
   });
};

const gameById = (req, res, next, id) => {
   Game.findById(id)
      .populate('maker', '_id name')
      .exec((err, game) => {
         if (err || !game) {
            return res.status(400).json({
               error: 'Game not found',
            });
         }
         req.game = game;
         return next();
      });
};

const isMaker = (req, res, next) => {
   const isMaker = req.game && req.auth && req.game.maker._id == req.auth._id;
   if (!isMaker) {
      return res.status(403).json({
         error: 'User is not authorized',
      });
   }
   return next();
};

export default {
   create,
   gameById,
   isMaker,
   list,
   listByMaker,
   read,
   update,
};
