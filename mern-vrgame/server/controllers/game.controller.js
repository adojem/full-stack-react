import Game from '../models/game.model';
import errorHandler from '../helpers/dbErrorHandler';

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

export default { create, list };
