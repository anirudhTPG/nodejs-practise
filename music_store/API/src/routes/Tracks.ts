import express from 'express';
import controller from '../controllers/Tracks';

const router = express.Router();

router.post('/create', controller.createTrack);
router.get('/get/:trackId', controller.readTrack);
router.get('/get', controller.readAll);
router.patch('/update/:trackId', controller.updateTrack);
router.delete('/delete/:trackId', controller.deleteTrack);

export = router;
