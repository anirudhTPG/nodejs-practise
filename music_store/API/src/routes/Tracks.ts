import express from 'express';
import controller from '../controllers/Tracks';
import * as Auth from '../middleware/auth.middleware';

const router = express.Router();

router.route('/create').post(Auth.authorize(['addTracks']), controller.createTrack);
router.route('/get/:trackId').get(Auth.authorize(['getTrack']), controller.readAll);
router.route('/get').get(Auth.authorize(['getTrack']), controller.readAll);
router.route('/update/:trackId').patch(Auth.authorize(['updateTracks']), controller.updateTrack);
router.route('/delete/:trackId').delete(Auth.authorize(['deleteTracks']), controller.deleteTrack);

export = router;
