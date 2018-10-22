import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import mediaCtrl from '../controllers/media.controller';

const router = express.Router();

router.route('/api/media/new/:userId').post(authCtrl.requireSign, mediaCtrl.create);

router.route('/api/medias/video/:mediaId').get(mediaCtrl.video);

router.param('userId', userCtrl.userByID);
router.param('mediaId', mediaCtrl.mediaById);

export default router;
