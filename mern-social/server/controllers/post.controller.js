import Post from '../models/post.model';
import errorHandler from '../helpers/dbErrorHandler';

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

export default { listNewsFeed };
