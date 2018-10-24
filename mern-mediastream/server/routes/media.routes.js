import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import mediaCtrl from '../controllers/media.controller';

const router = express.Router();

router.route('/api/media/new/:userId').post(authCtrl.requireSign, mediaCtrl.create);

router.route('/api/media/video/:mediaId').get(mediaCtrl.video);

router.route('/api/media/popular').get(mediaCtrl.listPopular);

router.route('/api/media/by/:userId').get(mediaCtrl.listByUser);

router
   .route('/api/media/:mediaId')
   .get(mediaCtrl.incrementViews, mediaCtrl.read)
   .put(authCtrl.requireSign, mediaCtrl.isPoster, mediaCtrl.update)
   .delete(authCtrl.requireSign, mediaCtrl.isPoster, mediaCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('mediaId', mediaCtrl.mediaById);

export default router;
