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

export default {
   create,
   gameById,
   list,
   listByMaker,
   read,
};
